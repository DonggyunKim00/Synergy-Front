import { css, Box, Button, Typography, useTheme } from '@mui/material';
import DefaultHeader from '@components/headers/DefaultHeader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import FilterMultiSelectModal from '@components/RecuiterPage/FilterModal';
import CardContent from '@components/RecuiterPage/CardContent'; // 👉 여기서 CardContent는 talent list 포함한 리스트 출력 컴포넌트!

const jobOptions = [
  '프론트엔드 개발자', '백엔드 개발자', '풀스택 개발자', 'AI/머신러닝 엔지니어',
  '클라우드 엔지니어', 'DevOps 엔지니어', '데이터 엔지니어', '모바일 앱 개발자',
  '임베디드 시스템 개발자', '블록체인 개발자', '프로덕트 디자이너', '그래픽 디자이너',
  '웹디자이너', '프로젝트 매니저', '데이터 분석가', '마케터', '학생', '취업 준비생', '연구원'
];

const educationOptions = ['고등학교 졸업', '2~3년제 졸업', '4년제 졸업', '대학원 석/박사'];

const ageOptions = ['20~24세 이하', '25~29세 이하', '30~34세 이하', '35세 이상'];

const experienceOptions = ['신입', '1~2년 이하', '3~4년 이하', '5년 이상'];

const regionOptions = [
  '수도권', '부산광역시', '대구광역시', '대전광역시', '광주광역시', '울산광역시',
  '세종특별자치시', '강원권', '충청권', '전라권', '경상권', '제주특별자치도'
];

const RecuiterPage = () => {
  const { palette, typo } = useTheme();

  const [jobFilter, setJobFilter] = useState<string[]>([]);
  const [educationFilter, setEducationFilter] = useState<string[]>([]);
  const [ageFilter, setAgeFilter] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);

  const [modalType, setModalType] = useState<string | null>(null);

  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);
  
  return (
    <Box
      css={css`
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 600px;
        height: 100%;
        background-color: ${palette.background.primary};
        display: flex;
        flex-direction: column;
      `}
    >
      <DefaultHeader backgroundColor={palette.background.primary} />

      <Box
        css={css`
          padding: 24px 16px 0;
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
          flex-grow: 1;
          overflow-y: auto;
          padding: 0 16px 80px;
          &::-webkit-scrollbar {
          display: none;
        }
        `}
      >
        <CardContent />
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

export default RecuiterPage;
