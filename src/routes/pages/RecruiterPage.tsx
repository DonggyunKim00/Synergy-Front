import { css, Box, Button, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import FilterMultiSelectModal from '@components/RecruiterPage/FilterModal';
import CardContent from '@components/RecruiterPage/CardContent';
import { jobOptions, regionOptions, ageOptions, experienceOptions, educationOptions } from 'src/constant/attendee-options';

const RecruiterPage = () => {
  const { palette, typo } = useTheme();

  const [jobFilter, setJobFilter] = useState<string[]>([]);
  const [educationFilter, setEducationFilter] = useState<string[]>([]);
  const [ageFilter, setAgeFilter] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);

  const [modalType, setModalType] = useState<string | null>(null);

  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);
  
  const filters = {
    page: 0,
    size: 0,
    occupations: jobFilter.join(','),
    educationLevel: educationFilter.join(','),
    ageGroup: ageFilter.join(','),
    experienceLevel: experienceFilter.join(','),
    regions: regionFilter.join(','),
  };

  return (
    <Box
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        min-width: 375px;
        max-width: 600px;
        background-color: ${palette.background.primary};
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      `}
    >
      <Box
        css={css`
          padding: 16px 16px 0px;
          flex-shrink: 0;
        `}
      >
        <Typography
          css={css`
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 8px;
            font-family: ${typo.fontFamily.Pretendard};
            color: ${palette.text.primary};
          `}
        >
          인재 둘러보기
        </Typography>
        <Typography
          css={css`
            font-size: 16px;
            color: ${palette.text.secondary};
            ${typo.body.l};
          `}
        >
          우리 회사에 적합한 인재를 저장해보세요.
        </Typography>

        <Box
          css={css`
            display: flex;
            overflow-x: auto;
            gap: 8px;
            margin-bottom: 24px;
            margin-top: 10px;
            padding-bottom: 8px;
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {[
            { label: '직무', type: 'job' },
            { label: '학력', type: 'education' },
            { label: '연령대', type: 'age' },
            { label: '경력', type: 'experience' },
            { label: '희망 근무지', type: 'region' },
          ].map(({ label, type }) => (
            <Button
              key={type}
              onClick={() => openModal(type)}
              variant="contained"
              endIcon={
                <ExpandMoreIcon
                  sx={{ fontSize: 18, color: palette.text.primary }}
                />
              }
              css={css`
                flex-shrink: 0;
                background-color: ${palette.background.secondary};
                color: ${palette.text.secondary};
                border-radius: 18px;
                border: none;
                padding: 6px 12px;
                font-weight: 600;
                font-size: 14px;
                text-transform: none;
              `}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          padding: 0 10px;
          overflow-y: auto;
        }
        `}
      >
        <CardContent filters={filters}/> 
      </Box>

      {/* 모달 */}
      <FilterMultiSelectModal
        open={modalType === 'job'}
        onClose={closeModal}
        title="직무"
        items={jobOptions}
        selectedItems={jobFilter}
        onChange={setJobFilter}
        multiSelect
        hasSelectAll
      />
      <FilterMultiSelectModal
        open={modalType === 'education'}
        onClose={closeModal}
        title="학력 선택"
        items={educationOptions}
        selectedItems={educationFilter}
        onChange={setEducationFilter}
      />
      <FilterMultiSelectModal
        open={modalType === 'age'}
        onClose={closeModal}
        title="연령대 선택"
        items={ageOptions}
        selectedItems={ageFilter}
        onChange={setAgeFilter}
      />
      <FilterMultiSelectModal
        open={modalType === 'experience'}
        onClose={closeModal}
        title="경력 선택"
        items={experienceOptions}
        selectedItems={experienceFilter}
        onChange={setExperienceFilter}
      />
      <FilterMultiSelectModal
        open={modalType === 'region'}
        onClose={closeModal}
        title="근무 지역 선택"
        items={regionOptions}
        selectedItems={regionFilter}
        onChange={setRegionFilter}
        multiSelect
      />
    </Box>
  );
};

export default RecruiterPage;
