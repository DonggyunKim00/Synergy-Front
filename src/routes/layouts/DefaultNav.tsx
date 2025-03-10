import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const DefaultNavLayout = () => {
  return (
    <Layout>
      <Outlet />
      <ScrollRestoration />
      <Navigation />
    </Layout>
  );
};

export default DefaultNavLayout;

const Navigation = () => {
  return (
    <Nav>
      <CustomLink to="/">
        <CustomButton>HOME</CustomButton>
      </CustomLink>
      <CustomLink to="/booth">
        <CustomButton>BOOTH</CustomButton>
      </CustomLink>
      <CustomLink to="/session">
        <CustomButton>SESSION</CustomButton>
      </CustomLink>
    </Nav>
  );
};

const Layout = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: 0 0 20px #0000000d;
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
`;

const CustomButton = styled(Button)`
  width: 100%;
  padding: 16px 10px;
  border: 1px solid #434343;
  border-radius: 0;
  font-weight: 800;
  color: inherit;
  background-color: inherit;
`;

const CustomLink = styled(NavLink)`
  width: 33.33333333%;
  background-color: black;
  color: #f5f5f5;
  &.active {
    background-color: #333;
    color: #949494;
  }
`;
