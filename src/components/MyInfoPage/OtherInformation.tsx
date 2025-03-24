import { Box, Typography, useTheme } from '@mui/material';
import images from '@assets/default-profile-img.png';

interface Props {
  education: string;
  ageGroup: string;
  techStacks: string;
  desiredWorkRegion: string;
  selfIntroduction: string;
  information: string;
  workplaceSelectionFactors: string;
  preferredCorporateCultures: string;
}

const OtherInformation = ({
  education,
  ageGroup,
  techStacks,
  desiredWorkRegion,
  selfIntroduction,
  information,
  workplaceSelectionFactors,
  preferredCorporateCultures,
}: Props) => {
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        width: '100%',
      }}
    >
      <InfoColumn title="학력" content={education} />
      <InfoColumn title="연령대" content={ageGroup} />
      <InfoColumn title="보유 기술" content={techStacks} />
      <InfoColumn title="희망 근무 지역" content={desiredWorkRegion} />
      <InfoColumn title="자기소개" content={selfIntroduction} />
      <InfoColumn title="경험 및 기타 정보" content={information || '-'} />
      <InfoColumn
        title="직장 선택 요소"
        content={workplaceSelectionFactors || '-'}
      />
      <InfoColumn
        title="선호하는 기업 문화"
        content={preferredCorporateCultures || '-'}
      />
    </Box>
  );
};

export default OtherInformation;

const InfoColumn = ({ title, content }: { title: string; content: string }) => {
  const { palette, typo } = useTheme();

  return (
    <Box css={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Typography
        variant="h4"
        css={{ ...typo.sub.m, color: palette.text.primary }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        css={{ ...typo.body.l, color: palette.text.tertiary }}
      >
        {content}
      </Typography>
    </Box>
  );
};
