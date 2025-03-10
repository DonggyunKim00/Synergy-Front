import React from 'react';
import { Box } from '@mui/material';
import AdminLogin from '@components/LoginPage/AdminLogin';

const AdminLoginPage = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <AdminLogin />
    </Box>
  );
};

export default AdminLoginPage;
