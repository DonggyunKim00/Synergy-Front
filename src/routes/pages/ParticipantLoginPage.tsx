import React from 'react';
import { Box } from '@mui/material';
import ParticipantLogin from '@components/LoginPage/ParticipantLogin';

const ParticipantLoginPage = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <ParticipantLogin />
    </Box>
  );
};

export default ParticipantLoginPage;
