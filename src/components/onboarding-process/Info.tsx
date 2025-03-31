import InputBox from '@components/InputBox';
import SelectBox from '@components/SelectBox';
import TextareaBox from '@components/TextareaBox';
import { Button, css, useTheme } from '@mui/material';
import { Infos } from 'src/types/funnel/onboarding.type';
import FileInputBox from '@components/FileInputBox';
import { useFormStore } from '@stores/client/useFormStore';
import { JOB_GROUPS, JOB_POSITIONS } from 'src/constant/onboarding-lookups';
import {
  AGE_GROUPS,
  CONFERENCE_PARTICIPATION_PURPOSE,
  EDUCATION_LEVELS,
  EXPERIENCE_LEVEL_TYPE,
  PREFERRED_CORPORATE_CULTURE,
  REGION_TYPE,
  WORKPLACE_SELECTION_FACTOR,
} from 'src/constant/onboarding-codes';

const Info = ({ onSubmit }: { onSubmit: (info: Infos) => void }) => {
  const { palette, typo, radius } = useTheme();
  const { form, setForm } = useFormStore();

  const handleChange = (key: keyof Infos, value: any) => {
    setForm(key, value);
  };

  return (
    <div
      css={css`
        margin-top: 40px;
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
        {/* 희망 직군 선택 */}
        <SelectBox
          id="hope_job_group"
          label="희망 직군"
          items={JOB_GROUPS}
          value={form.hope_job_group || ''}
          onChange={(value) => {
            handleChange('hope_job_group', value.toString());
            handleChange('hope_job_position', '');
          }}
          isRequired
          placeholder="선택"
        />

        {/* 희망 직무 선택 */}
        <SelectBox
          id="hope_job_position"
          label="희망 직무"
          items={
            JOB_POSITIONS.filter(
              (position) => position.job_group_id == form.hope_job_group,
            ) || []
          }
          value={form.hope_job_position || ''}
          onChange={(value) =>
            handleChange('hope_job_position', value.toString())
          }
          isRequired
          disabled={!form.hope_job_group}
          placeholder="희망 직무를 선택해 주세요."
        />

        {/* 학력 선택 */}
        <SelectBox
          id="education"
          label="학력"
          items={EDUCATION_LEVELS}
          value={form.education || ''}
          onChange={(value) => handleChange('education', value.toString())}
          isRequired
          placeholder="학력을 선택해 주세요."
        />

        {/* 연령대 선택 */}
        <SelectBox
          id="age"
          label="연령대"
          items={AGE_GROUPS}
          value={form.age || ''}
          onChange={(value) => handleChange('age', value.toString())}
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
          items={EXPERIENCE_LEVEL_TYPE}
          value={form.experience || ''}
          onChange={(value) => handleChange('experience', value.toString())}
          isRequired
          placeholder="경력을 선택해주세요."
        />

        {/* 희망 근무 지역 */}
        <SelectBox
          id="hope_location"
          label="희망 근무 지역"
          items={REGION_TYPE}
          value={form.hope_location || []}
          onChange={(value) => handleChange('hope_location', value)}
          isRequired
          placeholder="희망하는 근무 지역을 선택해주세요."
          multiple
        />

        {/* 자기소개서 */}
        <TextareaBox
          id="cover_letter"
          label="자기소개서"
          isRequired
          value={form.others_experience || ''}
          onChange={(value) => handleChange('cover_letter', value)}
          placeholder="자기소개를 400자 이내로 작성해주세요."
          max_length={400}
        />

        {/* 증명 사진 */}
        <FileInputBox
          id="profile_img"
          label="프로필 사진"
          onChange={(value) => handleChange('profile_img', value)}
          placeholder="JPG, PNG 파일 업로드"
          description="사진은 이력서 형식으로 채용담당자에게 공개되니 신중히 업로드해주세요."
        />

        {/* 경험 및 기타 정보 */}
        <InputBox
          id="others_experience"
          label="경험 및 기타 정보"
          isRequired={false}
          value={form.others_experience || ''}
          onChange={(value) => handleChange('others_experience', value)}
          placeholder="상세 경력 및 경험을 작성해 주세요."
        />

        {/* 직장 선택 요소 */}
        <SelectBox
          id="company"
          label="직장 선택 요소"
          items={WORKPLACE_SELECTION_FACTOR}
          value={form.company || []}
          onChange={(value) => handleChange('company', value)}
          placeholder="선택"
          multiple
        />

        {/* 선호하는 기업 문화 */}
        <SelectBox
          id="culture"
          label="선호하는 기업 문화"
          items={PREFERRED_CORPORATE_CULTURE}
          value={form.culture || []}
          onChange={(value) => handleChange('culture', value)}
          placeholder="선택"
          multiple
        />

        {/* 컨퍼런스 참여 목적 */}
        <SelectBox
          id="purpose"
          label="컨퍼런스 참여 목적"
          items={CONFERENCE_PARTICIPATION_PURPOSE}
          value={form.purpose || []}
          onChange={(value) => handleChange('purpose', value)}
          placeholder="선택"
          multiple
        />
      </div>

      {/* submit */}
      <Button
        onClick={() =>
          onSubmit({
            hope_job_group: form.hope_job_group,
            hope_job_position: form.hope_job_position,
            education: form.education,
            age: form.age,
            skills: form.skills,
            experience: form.experience,
            hope_location: form.hope_location,
            cover_letter: form.cover_letter,
            profile_img: form.profile_img || null,
            others_experience: form.others_experience || '',
            company: form.company,
            culture: form.culture,
            purpose: form.purpose,
          })
        }
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
