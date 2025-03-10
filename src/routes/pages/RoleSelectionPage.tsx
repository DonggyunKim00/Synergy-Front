import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleRoleSelection = (roleName: string) => {
    if (roleName === '참가자') {
      navigate('/participant-login');
    } else if (roleName === '관리자') {
      navigate('/admin-login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 36, md: 48 },
          fontWeight: 'bold',
          marginBottom: 2,
          textAlign: 'center',
        }}
      >
        F'LINK
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: 20, md: 24 },
          fontWeight: 'bold',
          marginBottom: 4,
          textAlign: 'center',
        }}
      >
        FLINK2025
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleRoleSelection('참가자')}
        sx={{
          width: { xs: '200px', md: '300px' },
          padding: { xs: '10px', md: '15px' },
          marginBottom: 2,
          fontSize: { xs: 14, md: 16 },
        }}
      >
        참가자
      </Button>

      <Button
        variant="contained"
        onClick={() => handleRoleSelection('관리자')}
        sx={{
          width: { xs: '200px', md: '300px' },
          padding: { xs: '10px', md: '15px' },
          fontSize: { xs: 14, md: 16 },
        }}
      >
        관리자
      </Button>
    </Box>
  );
};

export default RoleSelectionPage;
