import { useBoothVerify, useSessionVerify } from '@stores/server/attendee';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface Params {
  isAlreadyVerifyed: boolean; // 이전에 이미 QR인증되었는지 확인
  onQrSuccess: () => void; // QR에 성공했을때 호출 될 클라이언트 로직
  isBooth?: boolean;
}

export const useQrVerifyCheck = ({
  isAlreadyVerifyed,
  onQrSuccess,
  isBooth,
}: Params) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { qrMutation: sessionQrMutation } = useSessionVerify(Number(id));
  const { qrMutation: boothQrMutation } = useBoothVerify(Number(id));
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const qrCode = searchParams.get('qrCode');

    const verifyQR = async () => {
      if (isAlreadyVerifyed) return;
      if (qrCode && isBooth) {
        try {
          await boothQrMutation.mutateAsync({
            qrCode,
          });
          onQrSuccess();
        } catch (err) {
          alert('잘못된 QR 요청입니다.');
          navigate(`/booth/${id}`);
        }
      }
      if (qrCode && !isBooth) {
        try {
          await sessionQrMutation.mutateAsync({
            qrCode,
          });
          onQrSuccess();
        } catch (err) {
          alert('잘못된 QR 요청입니다.');
          navigate(`/session/${id}`);
        }
      }
    };
    verifyQR();
  }, []);
};
