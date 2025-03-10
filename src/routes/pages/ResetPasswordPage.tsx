import React from 'react';
import { Box } from '@mui/material';
import ResetPassword from '@components/AccountPage/ResetPassword';

const ResetPasswordPage = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <ResetPassword />
    </Box>
  );
};

export default ResetPasswordPage;
