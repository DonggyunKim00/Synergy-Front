import React, { useState } from 'react';
import { Box, Typography, TextField, Checkbox, Button, FormControlLabel } from '@mui/material';

const Signup = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketCode, setTicketCode] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: 회원가입 API 호출 
      console.log('회원가입 시도:', { name, email, ticketCode, password, phone });
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 48, fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
        F'LINK
      </Typography>
      <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
        간편 회원가입
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          fullWidth
          label="성함"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="F'LINK 티켓 코드"
          value={ticketCode}
          onChange={(e) => setTicketCode(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="휴대폰 번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreePersonalInfo}
              onChange={() => setAgreePersonalInfo(!agreePersonalInfo)}
            />
          }
          label="개인정보 수집에 동의합니다."
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
          }
          label="이용 약관에 동의합니다."
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          가입 완료
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
