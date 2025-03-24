import { Box, Typography, useTheme } from '@mui/material';
import images from '@assets/default-profile-img.png';

interface Props {
  name: string;
  jobName: string;
  experience: string;
  image: string;
}

const BasicInformation = ({ name, jobName, experience, image }: Props) => {
  const { palette, typo } = useTheme();

  return (
    <Box css={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box css={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Typography
          variant="h3"
          css={{ ...typo.title.m, color: palette.text.primary }}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          css={{ ...typo.sub.s, color: palette.text.tertiary }}
        >
          {jobName}
        </Typography>
        <Typography
          variant="body1"
          css={{ ...typo.body.s, color: palette.text.tertiary }}
        >
          {experience}
        </Typography>
      </Box>
      <img
        src={image || images}
        width={130}
        height={160}
        css={{ backgroundColor: palette.background.paper }}
      />
    </Box>
  );
};

export default BasicInformation;
