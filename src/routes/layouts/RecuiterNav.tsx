import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import { Button, styled } from '@mui/material';
import { css, useTheme } from '@mui/material';
import DefaultHeader from '@components/headers/DefaultHeader';

const RecuiterNavLayout = () => {
  const { palette } = useTheme();
  
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
      <DefaultHeader backgroundColor={palette.background.primary} />
      <Outlet />
      <ScrollRestoration />
      <RecuiterNavigation />
    </div>
  );
};

export default RecuiterNavLayout;

const RecuiterNavigation = () => {
  return (
    <Nav>
      <CustomLink to="/recuiter/list">
        <CustomButton>LIST</CustomButton>
      </CustomLink>
      <CustomLink to="/recuiter/mypage">
        <CustomButton>MY</CustomButton>
      </CustomLink>
    </Nav>
  );
};

const Nav = styled('nav')`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
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
