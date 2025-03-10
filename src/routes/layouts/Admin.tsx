import { Outlet, ScrollRestoration } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

export default AdminLayout;
