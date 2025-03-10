import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ResetPassword = (): React.JSX.Element => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('비밀번호 재설정 요청:', { name, email, phone });
      // TODO: API 호출 로직
      setStep(2);
    } catch (error) {
      console.error('비밀번호 재설정 에러:', error);
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('새로운 비밀번호 설정:', newPassword);
      // API 호출 로직...
      alert('비밀번호가 재설정되었습니다.');
    } catch (error) {
      console.error('비밀번호 설정 에러:', error);
      alert('비밀번호 설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box sx={{ width: '300px', margin: '20px auto', textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
        F'LINK
      </Typography>
      <Typography variant="h2" sx={{ fontSize: '24px', marginBottom: '30px' }}>
        비밀번호 재설정
      </Typography>
      {step === 1 ? (
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
          <Button type="submit" variant="contained" fullWidth>
            확인
          </Button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <Box sx={{ marginBottom: '20px', textAlign: 'left' }}>
            <TextField
              fullWidth
              id="newPassword"
              label="새 비밀번호"
              type="password"
              placeholder="새로운 비밀번호 입력"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Box>
          <Typography variant="body2" sx={{ fontSize: '14px', color: 'text.secondary', marginBottom: '20px' }}>
            비밀번호는 영문자와 숫자를 조합하여 8-20자 이내로 설정합니다.
          </Typography>
          <Button type="submit" variant="contained" fullWidth>
            확인
          </Button>
        </form>
      )}
    </Box>
  );
};

export default ResetPassword;
