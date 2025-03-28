import { useSessionVerify } from '@stores/server/attendee';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export const useQrVerifyCheck = ({
  onQrSuccess,
}: {
  onQrSuccess: () => void;
}) => {
  const { id } = useParams();
  const { qrMutation } = useSessionVerify();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const qrCode = searchParams.get('qrCode');
    const verifyQR = async () => {
      if (qrCode) {
        try {
          await qrMutation.mutateAsync({
            sessionId: Number(id),
            qrCode,
          });
          onQrSuccess();
        } catch (err) {
          alert('잘못된 QR 요청입니다.');
        }
      }
    };
    verifyQR();
  }, []);
};
