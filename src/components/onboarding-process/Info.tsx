import { useState } from 'react';
import InputBox from '@components/InputBox';
import SelectBox from '@components/SelectBox';
import TextareaBox from '@components/TextareaBox';
import { Button, css, useTheme } from '@mui/material';
import {
  age_range,
  company_culture,
  company_type,
  conference_purpose,
  education_levels,
  experience_range,
  hope_job,
  location,
  salary_range,
} from 'src/constant/onboarding';
import { Infos } from 'src/types/funnel/onboarding.type';

const Info = ({ onSubmit }: { onSubmit: (info: Infos) => void }) => {
  const { palette, typo, radius } = useTheme();

  const [info, setInfo] = useState<Infos>({
    // 필수 속성
    hope_job: '',
    education: '',
    age: '',
    skills: '',
    experience: '',
    hope_location: '',
    profile_img: '',
    cover_letter: '',
    // 선택 속성
    others_experience: '',
    salary: '',
    company: '',
    culture: '',
    purpose: '',
  });

  const handleChange = (key: keyof Infos, value: string) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      css={css`
        margin-top: 20px;
      `}
    >
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
          isRequired
          placeholder="희망 직무를 선택해 주세요."
        />

        {/* 학력 선택 */}
        <SelectBox
          id="education"
          label="학력"
          items={education_levels}
          value={info.education}
          onChange={(value) => handleChange('education', value)}
          isRequired
          placeholder="학력을 선택해 주세요."
        />

        {/* 연령대 선택 */}
        <SelectBox
          id="age"
          label="연령대"
          items={age_range}
          value={info.age}
          onChange={(value) => handleChange('age', value)}
          isRequired
          placeholder="연령대를 선택해 주세요."
        />

        {/* 보유 기술 */}
        <InputBox
          label="보유 기술"
          id="skills"
          isRequired
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
          isRequired
          placeholder="경력을 선택해주세요."
        />

        {/* 희망 근무 지역 */}
        <SelectBox
          id="hope_location"
          label="희망 근무 지역"
          items={location}
          value={info.hope_location}
          onChange={(value) => handleChange('hope_location', value)}
          isRequired
          placeholder="희망하는 근무 지역을 선택해주세요."
        />

        {/* 경험 및 기타 정보 */}
        <InputBox
          id="profile_img"
          label="증명사진"
          isRequired
          onChange={(value) => handleChange('profile_img', value)}
          placeholder="JPG, PNG 파일 업로드"
        />

        {/* 자기소개서 */}
        <TextareaBox
          id="cover_letter"
          label="자기소개서"
          isRequired
          onChange={(value) => handleChange('cover_letter', value)}
          placeholder="자기소개를 400자 이내로 작성해주세요."
          max_length={400}
        />

        {/* 경험 및 기타 정보 */}
        <InputBox
          id="others_experience"
          label="경험 및 기타 정보"
          isRequired={false}
          onChange={(value) => handleChange('others_experience', value)}
          placeholder="상세 경력 및 경험을 작성해 주세요."
        />

        {/* 희망 연봉 */}
        <SelectBox
          id="salary"
          label="희망 연봉"
          items={salary_range}
          value={info.salary || ''}
          onChange={(value) => handleChange('salary', value)}
          placeholder="희망 연봉을 선택해 주세요."
        />

        {/* 직장 선택 요소 */}
        <SelectBox
          id="company"
          label="희망 회사 규모"
          items={company_type}
          value={info.company || ''}
          onChange={(value) => handleChange('company', value)}
        />

        {/* 선호하는 기업 문화 */}
        <SelectBox
          id="culture"
          label="선호하는 기업 문화"
          items={company_culture}
          value={info.culture || ''}
          onChange={(value) => handleChange('culture', value)}
        />

        {/* 컨퍼런스 참여 목적 */}
        <SelectBox
          id="purpose"
          label="컨퍼런스 참여 목적"
          items={conference_purpose}
          value={info.purpose || ''}
          onChange={(value) => handleChange('purpose', value)}
        />
      </div>

      {/* submit */}
      <Button
        onClick={() => onSubmit(info)}
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

export default Info;
