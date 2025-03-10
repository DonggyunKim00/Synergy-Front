import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';

const FindId = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      console.log('아이디 찾기 요청:', { name, email, phone });
      setUserId('synergy2025'); // 테스트용 ID
      setShowResult(true);
    } catch (error) {
      console.error('아이디 찾기 에러:', error);
      alert('아이디 찾기 중 오류가 발생했습니다.');
    }
  };

  const resetForm = (): void => {
    setName('');
    setEmail('');
    setPhone('');
    setUserId('');
    setShowResult(false);
  };

  if (showResult) {
    return (
      <Box sx={{ width: '300px', margin: '20px auto', textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '28px', marginBottom: '10px' }}>
          F'LINK
        </Typography>
        <Typography variant="h2" sx={{ fontSize: '20px', marginBottom: '30px' }}>
          아이디 찾기
        </Typography>
        <Typography sx={{ fontSize: '16px', marginBottom: '20px' }}>
          회원님의 아이디는 <strong>{userId}</strong> 입니다.
        </Typography>
        <Button
          variant="contained"
          onClick={resetForm}
          sx={{
            width: '100%',
            marginTop: '20px',
          }}
        >
          확인
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '300px', margin: '20px auto', textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
        F'LINK
      </Typography>
      <Typography variant="h2" sx={{ fontSize: '24px', marginBottom: '30px' }}>
        아이디 찾기
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: '20px', textAlign: 'left' }}>
          <TextField
            fullWidth
            id="name"
            label="성함"
            placeholder="성함을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ marginBottom: '20px', textAlign: 'left' }}>
          <TextField
            fullWidth
            id="email"
            label="이메일"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ marginBottom: '20px', textAlign: 'left' }}>
          <TextField
            fullWidth
            id="phone"
            label="휴대폰 번호"
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: '#ddd',
          }}
        >
          확인
        </Button>
      </form>
    </Box>
  );
};

export default FindId;
