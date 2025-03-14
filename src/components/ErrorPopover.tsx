import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import { css, useTheme } from '@mui/material';

const ErrorPopover = ({ error }: { error: string | null }) => {
  const { palette } = useTheme();
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0); // UI 갱신을 위한 키값

  useEffect(() => {
    if (error) {
      setVisible(true);
      setKey((prevKey) => prevKey + 1); // key를 변경하여 UI를 리셋

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer); // 기존 타이머 제거
    }
  }, [error]);

  if (!visible || !error) return null;

  return (
    <div
      key={key} // key를 변경하여 UI 리렌더링 유도
      css={css`
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${palette.opacity.opa200};
        color: ${palette.text.primary};
        padding: 10px;
        border-radius: 20px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        font-weight: bold;
        animation:
          ${shake} 0.3s ease-in-out,
          ${fadeOut} 2.5s ease-in-out 0.5s forwards;
        z-index: 1000;
        width: 327px;
      `}
    >
      {error}
    </div>
  );
};

export default ErrorPopover;

// 흔들림 효과 (Shake)
const shake = keyframes`
  0% { transform: translateX(-50%) translateX(0); }
  20% { transform: translateX(-50%) translateX(-5px); }
  40% { transform: translateX(-50%) translateX(5px); }
  60% { transform: translateX(-50%) translateX(-5px); }
  80% { transform: translateX(-50%) translateX(5px); }
  100% { transform: translateX(-50%) translateX(0); }
`;

// 서서히 사라지는 효과 (Fade-out)
const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;
