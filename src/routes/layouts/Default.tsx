import { Outlet, ScrollRestoration } from 'react-router-dom';
import styled from '@emotion/styled';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: 0 0 20px #0000000d;
`;

export default function DefaultLayout() {
  return (
    <Layout>
      <Outlet />
      <ScrollRestoration />
    </Layout>
  );
}
