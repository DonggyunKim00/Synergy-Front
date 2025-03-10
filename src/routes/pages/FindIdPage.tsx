import React from 'react';
import { Box } from '@mui/material';
import FindId from '@components/AccountPage/FindId';

const FindIdPage = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <FindId />
    </Box>
  );
};

export default FindIdPage;
