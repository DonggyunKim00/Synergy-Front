import BackHeader from '@components/headers/BackHeader';
import Information from '@components/SessionPage/Information';
import QnaSection from '@components/SessionPage/QnaSection';
import SuccessPopup from '@components/SuccessPopup';
import { styled, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionDetails = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [qnaSuccess, setQnaSuccess] = useState(false);
  const [qrSuccess, setQrSuccess] = useState(false);

  return (
    <>
      <BackHeader
        backgroundColor={palette.background.tertiary}
        onClick={() => navigate('/session')}
        text="Session"
      />
      <Container>
        {/* Session Information */}
        <Information />

        {/* Q&A */}
        <QnaSection />
      </Container>

      {qnaSuccess && (
        <SuccessPopup
          open={true}
          onClose={() => setQnaSuccess(false)}
          title="질문을 제출하였습니다."
          earnPoint={50}
          totalPoint={250}
          needPoint={50}
          rating="SILVER"
        />
      )}

      {qrSuccess && (
        <SuccessPopup
          open={true}
          onClose={() => setQrSuccess(false)}
          title="세션에 오신 것을 환영합니다!"
          earnPoint={50}
          totalPoint={250}
          needPoint={50}
          rating="SILVER"
        />
      )}
    </>
  );
};

export default SessionDetails;

const Container = styled('div')(({ theme }) => ({
  padding: '20px 16px 16px',
  backgroundColor: theme.palette.background.tertiary,
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
