import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const AdminLogin = (): React.JSX.Element => {
  const [adminId, setAdminId] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 백엔드 API 호출 및 인증 처리
    console.log('관리자 ID:', adminId);
    alert('로그인 시도');
    setAdminId('');
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
      {/* 타이틀 */}
      <Typography variant="h1" sx={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
        F'LINK
      </Typography>
      <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>
        관리자 로그인
      </Typography>

      {/* 로그인 폼 */}
      <form onSubmit={handleLogin}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px', marginBottom: '20px' }}>
          <TextField
            fullWidth
            id="adminId"
            label="관리자 ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="관리자 ID를 입력하세요"
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            width: '300px',
            padding: '15px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          로그인
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
