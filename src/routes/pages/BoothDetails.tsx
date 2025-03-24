import BackHeader from '@components/headers/BackHeader';
import SuccessPopup from '@components/SuccessPopup';
import { css, styled, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoothDetails = () => {
  const { palette, typo } = useTheme();
  const navigate = useNavigate();
  const [qrSuccess, setQrSuccess] = useState(false);

  return (
    <>
      <BackHeader
        backgroundColor={palette.background.tertiary}
        onClick={() => navigate('/booth')}
        text="Booth"
      />
      <Container>
        <Typography
          variant="body1"
          color={palette.text.primary}
          css={css`
            ${typo.sub.s}
          `}
        >
          234C
        </Typography>
        <Typography
          variant="h1"
          color={palette.text.primary}
          css={css`
            ${typo.title.m}
          `}
        >
          CodeSphere
        </Typography>
        <Typography
          variant="body1"
          color={palette.text.secondary}
          css={css`
            ${typo.sub.xs}
            margin: 4px 0px;
          `}
        >
          클라우드 서비스
        </Typography>
        <Typography
          variant="body1"
          color={palette.text.tertiary}
          css={css`
            ${typo.body.s}
          `}
        >
          C HALL
        </Typography>
        <StyledImage src="" />
        <p
          css={css`
            ${typo.body.m}
            color: ${palette.text.primary};
          `}
        >
          글로벌 IT 기업 CodeSphere에서 React 기반 프론트엔드 엔지니어와
          클라우드 기반 백엔드 엔지니어를 채용합니다. TypeScript, Node.js,
          Kubernetes 경험자를 환영합니다.
        </p>
      </Container>

      {qrSuccess && (
        <SuccessPopup
          open={true}
          onClose={() => setQrSuccess(false)}
          title="부스에 오신 것을 환영합니다!"
          earnPoint={50}
          totalPoint={250}
          needPoint={50}
          rating="SILVER"
        />
      )}
    </>
  );
};

export default BoothDetails;

const Container = styled('div')(({ theme }) => ({
  padding: '20px 16px 16px',
  backgroundColor: theme.palette.background.tertiary,
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.primary,
  height: '187px',
  margin: '12px 0px 20px',
}));
