import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackHeader from '@components/headers/BackHeader';
import { Box, Typography, css } from '@mui/material';

const RecruiterMain = () => {
  const { palette, typo } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <BackHeader
        backgroundColor={palette.background.primary}
        onClick={() => navigate(-1)}
      />
      <Box
        css={css`
          max-width: 600px;
          margin: 0 auto;
          padding: 20px 16px 0;
          background-color: ${palette.background.primary};
          height: 100%;
          overflow-y: auto;
        `}
      >
        <Typography
          css={css`
            font-family: ${typo.fontFamily.Pretendard};
            font-size: 26px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            color: ${palette.text.primary};
          `}
        >
          내가 저장한 인재
        </Typography>
      </Box>
    </>
  );
};

export default RecruiterMain;
