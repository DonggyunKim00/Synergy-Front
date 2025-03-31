import { Box, Button, css, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const { typo, palette } = useTheme();
  const navigate = useNavigate();

  const styles = {
    title: css`
      ${typo.title.l}
      color: ${palette.text.primary};
    `,
    button: css`
      border-radius: 12px;
      height: 50px;
      width: 160px;
      flex: 1 0 0;
      background-color: ${palette.background.tertiary};
      color: ${palette.text.primary};
      border: none;
      ${typo.sub.s}
    `,
  };
  return (
    <Box
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <h1 css={styles.title}>404</h1>
        <h1 css={styles.title}>페이지를 찾을 수 없습니다.</h1>
      </div>
      <div>
        <Button css={styles.button} onClick={() => navigate('/')}>
          돌아가기
        </Button>
      </div>
    </Box>
  );
}
