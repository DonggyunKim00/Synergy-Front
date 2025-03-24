import { NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Button, styled } from '@mui/material';
import { css, useTheme } from '@mui/material';
import DefaultHeader from '@components/headers/DefaultHeader';

const RecruiterNavLayout = () => {
  const { palette } = useTheme();
  const location = useLocation();

  const hideHeader = location.pathname.includes('/recruiter/mypage') || location.pathname.includes('/recruiter/main');

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
        height: 100%;
        width: 100%;
        margin: 0 auto;
        box-shadow: 0 0 20px #0000000d;
        background-color: ${palette.background.primary};
      `}
    >
      {!hideHeader && <DefaultHeader backgroundColor={palette.background.primary} />}
      <div
        css={css`
          flex: 1;
          overflow-y: auto;
        `}
      >
        <Outlet />
      </div>
      <ScrollRestoration />
      <RecuiterNavigation />
    </div>
  );
};

export default RecruiterNavLayout;

const RecuiterNavigation = () => {
  return (
    <Nav>
      <CustomLink to="/recruiter/list">
        <CustomButton>LIST</CustomButton>
      </CustomLink>
      <CustomLink to="/recruiter/mypage">
        <CustomButton>MY</CustomButton>
      </CustomLink>
    </Nav>
  );
};

const Nav = styled('nav')`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
`;

const CustomLink = styled(NavLink)(
  ({ theme }) => css`
    width: 50%;
    background-color: ${theme.palette.background.primary};
  `,
);

const CustomButton = styled(Button)(
  ({ theme }) => css`
    width: 100%;
    padding: 16px 10px;
    border: 1px solid ${theme.palette.border.primary};
    border-radius: 0;
    font-weight: 800;
    color: ${theme.palette.text.primary};
    background-color: ${theme.palette.background.primary};

    .active & {
      background-color: ${theme.palette.background.secondary};
    }
  `,
);
