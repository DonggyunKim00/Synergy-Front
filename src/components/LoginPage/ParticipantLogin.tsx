import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const ParticipantLogin = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: 실제 API 호출
      console.log('로그인 시도:', email, password);
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 시도');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleFindIdRedirect = () => {
    navigate('/find-id');
  };

  const handleFindPasswordRedirect = () => {
    navigate('/reset-password');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 48, fontWeight: 'bold', mb: 2 }}>
        F'LINK
      </Typography>
      <Typography variant="h6" sx={{ fontSize: 24, mb: 2 }}>
        사용자 로그인
      </Typography>
      <TextField
        label="이메일"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <PersonIcon />,
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="비밀번호"
        type="password"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <LockIcon />,
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mb: 1 }}
      >
        로그인
      </Button>
      <Button
        variant="contained"
        onClick={handleKakaoLogin}
        fullWidth
        sx={{ mb: 2, backgroundColor: '#ddd' }}
      >
        카카오 로그인
      </Button>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          처음이신가요?{' '}
          <Box
            component="span"
            onClick={handleSignupRedirect}
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            간편가입 하기
          </Box>
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          아이디/비밀번호를 잊었어요{' '}
          <Box
            component="span"
            onClick={handleFindIdRedirect}
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            아이디 찾기
          </Box>{' '}
          |{' '}
          <Box
            component="span"
            onClick={handleFindPasswordRedirect}
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            비밀번호 찾기
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default ParticipantLogin;
