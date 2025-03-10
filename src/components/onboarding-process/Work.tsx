import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  css,
} from '@mui/material';
import { useState } from 'react';
import { Jobs } from 'src/types/funnel/onboarding.type';
import { jobs } from 'src/constant/onboarding';
import SelectBox from '@components/SelectBox';

type ChildJob = {
  value: string;
  text: string;
};
interface Props {
  onNext: (work: Jobs) => void;
}

const Work = ({ onNext }: Props) => {
  const [work, setwork] = useState<Jobs>({
    parent: '',
    child: '',
    employeement_agree: null,
    private_agree: false,
  });

  const [childrenJobs, setChildrenJobs] = useState<ChildJob[]>([]);

  // 상태 변경 핸들러
  const handleChange = <T extends keyof Jobs>(key: T, value: Jobs[T]) => {
    setwork((prev) => ({ ...prev, [key]: value }));
  };

  // 부모 직업 변경 핸들러
  const handleParentChange = (value: string) => {
    const children = jobs.find((job) => job.value === value)?.children;
    setChildrenJobs(children ?? []);
  };

  return (
    <>
      <Typography
        variant="h1"
        css={css`
          font-size: 28px;
        `}
      >
        현재 어떤 일을 하고 계신가요?
      </Typography>

      <Typography
        variant="inherit"
        css={css`
          font-size: 17px;
          margin: 17px 0px 47px;
        `}
        color="#717171"
      >
        채용을 희망할 경우 알려주세요! <br />
        <br />
        관련 혜택을 제공해 드립니다.
      </Typography>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 30px;
        `}
      >
        {/* 부모 직업 선택 */}
        <SelectBox
          id="parent-job"
          label="직업"
          items={jobs}
          value={work.parent ?? ''}
          onChange={(value) => {
            handleChange('parent', value.toString());
            handleParentChange(value.toString());
          }}
        />

        {/* 자식 직무 선택 */}
        <SelectBox
          id="child-job"
          label="직무"
          items={childrenJobs}
          value={work.child ?? ''}
          onChange={(value) => handleChange('child', value.toString())}
          disabled={childrenJobs.length === 0}
        />

        {/* 채용 희망 여부 선택 */}
        <FormControl>
          <FormLabel>채용 희망 여부</FormLabel>
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={work.employeement_agree}
            onChange={(e) =>
              handleChange('employeement_agree', e.target.value as 'yes' | 'no')
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio size="small" />}
              label="예"
            />
            <FormControlLabel
              value="no"
              control={<Radio size="small" />}
              label="아니오"
            />
          </RadioGroup>
        </FormControl>

        {/* 개인정보 수집 동의 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={work.private_agree}
              onChange={(e) => handleChange('private_agree', e.target.checked)}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 20 },
                fontSize: '13px',
              }}
            />
          }
          label="개인 정보 수집에 동의합니다."
        />
      </div>

      {/* 버튼 클릭 시 조건에 따라 submit 또는 onNext 실행 */}
      <Button
        onClick={() => onNext(work)}
        sx={{
          width: '100%',
          backgroundColor: '#ddd',
          marginTop: '50px',
        }}
      >
        완료
      </Button>
    </>
  );
};

export default Work;
