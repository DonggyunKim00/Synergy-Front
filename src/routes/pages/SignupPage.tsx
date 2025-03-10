import React from 'react';
import { Box } from '@mui/material';
import Signup from '@components/SignupPage/Signup';

const SignupPage = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Signup />
    </Box>
  );
};

export default SignupPage;
