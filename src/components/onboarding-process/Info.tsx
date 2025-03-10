import { useState } from 'react';
import InputBox from '@components/InputBox';
import SelectBox from '@components/SelectBox';
import TextareaBox from '@components/TextareaBox';
import { Button, css, Typography } from '@mui/material';
import {
  company_culture,
  company_type,
  conference_purpose,
  experience_range,
  hope_job,
  salary_range,
} from 'src/constant/onboarding';
import { Infos } from 'src/types/funnel/onboarding.type';

const Info = ({ onSubmit }: { onSubmit: (info: Infos) => void }) => {
  const [info, setInfo] = useState<Infos>({
    hope_job: '',
    skills: '',
    experience: '',
    others_experience: '',
    cover_letter: '',
    location: '',
    company: '',
    culture: '',
    purpose: '',
    salary: '',
  });

  const handleChange = (key: keyof Infos, value: string | number) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Typography
        variant="h1"
        css={css`
          font-size: 28px;
        `}
      >
        채용 담당자를 위한 <br /> 추가 정보를 입력해주세요!
      </Typography>

      <Typography
        variant="inherit"
        css={css`
          font-size: 17px;
          margin: 17px 0px 47px;
        `}
        color="#717171"
      >
        작성한 내용을 채용 담당자가 볼 수 있습니다.
      </Typography>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 30px;
          height: 100%;
        `}
      >
        {/* 희망 직무 선택 */}
        <SelectBox
          id="hope_job"
          label="희망 직무"
          items={hope_job}
          value={info.hope_job}
          onChange={(value) => handleChange('hope_job', value)}
        />

        {/* 보유 기술 */}
        <InputBox
          label="보유 기술"
          id="skills"
          isRequired={true}
          placeholder="ex) java, aws ..."
          onChange={(value) => handleChange('skills', value)}
        />

        {/* 경력 */}
        <SelectBox
          id="experience"
          label="경력"
          items={experience_range}
          value={info.experience}
          onChange={(value) => handleChange('experience', value)}
        />

        {/* 경험 및 기타 정보 */}
        <InputBox
          label="경험 및 기타 정보"
          id="others_experience"
          isRequired={false}
          onChange={(value) => handleChange('others_experience', value)}
        />

        {/* 희망 연봉 */}
        <SelectBox
          id="salary"
          label="희망 연봉"
          items={salary_range}
          value={info.salary ?? null}
          onChange={(value) => handleChange('salary', value)}
        />

        {/* 희망 근무 지역 */}
        <InputBox
          label="희망 근무 지역"
          id="location"
          isRequired={false}
          onChange={(value) => handleChange('location', value)}
        />

        {/* 직장 선택 요소 */}
        <SelectBox
          id="company"
          label="희망 회사 규모"
          items={company_type}
          value={info.company ?? null}
          onChange={(value) => handleChange('company', value)}
        />

        {/* 선호하는 기업 문화 */}
        <SelectBox
          id="culture"
          label="선호하는 기업 문화"
          items={company_culture}
          value={info.culture ?? null}
          onChange={(value) => handleChange('culture', value)}
        />

        {/* 컨퍼런스 참여 목적 */}
        <SelectBox
          id="purpose"
          label="컨퍼런스 참여 목적"
          items={conference_purpose}
          value={info.purpose ?? null}
          onChange={(value) => handleChange('purpose', value)}
        />

        {/* 자기소개서 */}
        <TextareaBox
          label="자기소개서"
          id="cover_letter"
          isRequired={false}
          onChange={(value) => handleChange('cover_letter', value)}
        />
      </div>

      {/* submit */}
      <Button
        onClick={() => onSubmit(info)}
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

export default Info;
