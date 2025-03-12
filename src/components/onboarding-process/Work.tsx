import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  css,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Jobs } from 'src/types/funnel/onboarding.type';
import { jobs } from 'src/constant/onboarding';
import SelectBox from '@components/SelectBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type ChildJob = {
  value: string;
  text: string;
};
interface Props {
  onNext: (work: Jobs) => void;
}

const Work = ({ onNext }: Props) => {
  const { palette, typo, radius } = useTheme();

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
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-top: 38px;
      `}
    >
      <Typography
        variant="h2"
        css={css`
          ${typo.title.l};
          color: ${palette.text.primary};
        `}
      >
        현재 어떤 일을 하고 계신가요?
      </Typography>

      <Typography
        variant="body1"
        css={css`
          ${typo.body.l};
          color: ${palette.text.secondary};
          line-height: 130%;
          margin: 12px 0px 36px;
        `}
      >
        채용을 희망할 경우 알려주세요! <br />
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
          isRequired
          placeholder="현재 직업을 선택해주세요."
        />

        {/* 자식 직무 선택 */}
        <SelectBox
          id="child-job"
          label="직무"
          items={childrenJobs}
          value={work.child ?? ''}
          onChange={(value) => handleChange('child', value.toString())}
          disabled={childrenJobs.length === 0}
          isRequired
          placeholder="현재 직무를 선택해주세요."
        />

        {/* 채용 희망 여부 선택 */}
        <FormControl>
          <span
            css={css`
              ${typo.sub.m}
              color: ${palette.text.primary};
            `}
          >
            채용 희망 여부 *
          </span>
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={work.employeement_agree}
            onChange={(e) =>
              handleChange('employeement_agree', e.target.value as 'yes' | 'no')
            }
          >
            <FormControlLabel
              value="yes"
              control={
                <Radio
                  size="small"
                  sx={{
                    color: palette.icon.primary,
                    '&.Mui-checked': {
                      color: palette.icon.secondary,
                    },
                  }}
                />
              }
              label="예"
              css={css`
                color: ${palette.text.primary};
              `}
            />
            <FormControlLabel
              value="no"
              control={
                <Radio
                  size="small"
                  sx={{
                    color: palette.icon.primary,
                    '&.Mui-checked': {
                      color: palette.icon.secondary,
                    },
                  }}
                />
              }
              label="아니오"
              css={css`
                ${typo.body.l}
                color: ${palette.text.primary};
              `}
            />
          </RadioGroup>
        </FormControl>

        {/* 개인정보 수집 동의 */}
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckCircleOutlineIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={work.private_agree}
              onChange={(e) => handleChange('private_agree', e.target.checked)}
              sx={{
                color: palette.icon.primary,
                '& .MuiSvgIcon-root': { fontSize: 16 },
                '&.Mui-checked': {
                  color: palette.icon.primary,
                },
                fontSize: '20px',
              }}
            />
          }
          label={
            <Typography
              variant="body1"
              css={css`
                ${typo.body.m}
                color: ${palette.text.secondary};
              `}
            >
              개인 정보 수집에 동의합니다.
            </Typography>
          }
        />
      </div>

      {/* 버튼 클릭 시 조건에 따라 submit 또는 onNext 실행 */}
      <Button
        onClick={() => onNext(work)}
        css={css`
          position: sticky;
          bottom: 0;
          ${typo.sub.l}
          color: ${palette.text.primary};
          background-color: ${palette.background.quinary};
          border: none;
          width: 100%;
          margin-top: 20px;
          border-radius: ${radius.md};
          height: 50px;
        `}
      >
        완료
      </Button>
    </div>
  );
};

export default Work;
