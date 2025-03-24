import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import { Button, css, useTheme, styled } from '@mui/material';

const DefaultNavLayout = () => {
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
      <Outlet />
      <ScrollRestoration />
      <Navigation />
    </div>
  );
};

export default DefaultNavLayout;

const Navigation = () => {
  return (
    <Nav>
      <CustomLink to="/booth">
        <CustomButton>BOOTH</CustomButton>
      </CustomLink>
      <CustomLink to="/mypage">
        <CustomButton>MY</CustomButton>
      </CustomLink>
      <CustomLink to="/session">
        <CustomButton>SESSION</CustomButton>
      </CustomLink>
    </Nav>
  );
};

const Nav = styled('nav')`
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  max-width: 600px;
`;

const CustomLink = styled(NavLink)(
  ({ theme }) => css`
    width: 33.33333333%;
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
