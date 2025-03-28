import BackHeader from '@components/headers/BackHeader';
import Information from '@components/SessionPage/Information';
import QnaSection from '@components/SessionPage/QnaSection';
import SuccessPopup from '@components/SuccessPopup';
import { useQrVerifyCheck } from '@hooks/useQrVerifyCheck';
import { styled, useTheme } from '@mui/material';
import { useSessionDetail } from '@stores/server/session';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SessionDetails = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: { data },
  } = useSessionDetail(Number(id));

  const [qrSuccess, setQrSuccess] = useState(false);
  const [qnaSuccess, setQnaSuccess] = useState(false);

  useQrVerifyCheck({ onQrSuccess: () => setQrSuccess(true) });

  return (
    <>
      <BackHeader
        backgroundColor={palette.background.tertiary}
        onClick={() => navigate('/session')}
        text="Session"
      />
      <Container>
        {/* Session Information */}
        <Information
          id={data.sessionId}
          title={data.title}
          speaker={data.speaker}
          speakerPosition={data.speakerPosition}
          startTime={data.startTime}
          endTime={data.endTime}
          image={data.imageUrl}
          description={data.description}
        />

        {/* Q&A */}
        <QnaSection qnaData={data.questionResDto} />
      </Container>

      {qnaSuccess && (
        <SuccessPopup
          open={true}
          onClose={() => setQnaSuccess(false)}
          title="질문을 제출하였습니다."
          earnPoint={50}
        />
      )}

      {qrSuccess && (
        <SuccessPopup
          open={true}
          onClose={() => setQrSuccess(false)}
          title="세션에 오신 것을 환영합니다!"
          earnPoint={30}
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
