import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { css, useTheme } from '@mui/material';

export default function DefaultLayout() {
  const { palette } = useTheme();
  const location = useLocation();

  const isOnboarding = location.pathname === '/onboarding';

  return (
    <div
      css={css`
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        max-width: 600px;
        min-width: 375px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        box-shadow: 0 0 20px #0000000d;
        background-color: ${isOnboarding
          ? palette.background.tertiary
          : palette.background.primary};
      `}
    >
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
