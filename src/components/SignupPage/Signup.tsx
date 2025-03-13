import React, { useState } from 'react';
import { Box, Typography, TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import { css, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Signup = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typography, shape, spacing } = theme;

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

  const containerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: ${spacing(1)};
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: bold;
    margin-bottom: ${spacing(1)};
    text-align: center;
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
  `;

  const subtitleStyle = css`
    font-size: 26px;
    margin-bottom: ${spacing(3)};
    text-align: center;
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
  `;

  const formStyle = css`
    width: 100%;
  `;

  const textFieldStyle = css`
    margin-bottom: ${spacing(1)};
    .MuiOutlinedInput-root {
      color: ${palette.text.primary};
      border-radius: ${shape.borderRadius}px;
      fieldset {
        border-color: ${palette.divider_custom.primary};
      }
      &:hover fieldset {
        border-color: ${palette.divider_custom.secondary};
      }
      &.Mui-focused fieldset {
        border-color: ${palette.primary.main};
      }
    }
    .MuiInputLabel-root {
      color: ${palette.text.secondary};
      font-family: ${typography.fontFamily};
    }
  `;

  const buttonStyle = css`
    margin-top: ${spacing(2)};
    padding: ${spacing(1.5)};
    font-size: 16px;
    font-weight: bold;
    border: none;
    background-color: ${palette.background.quaternary};
    color: ${palette.text.primary};
    border-radius: ${shape.borderRadius}px;
    &:hover {
      background-color: ${palette.background.tertiary};
    }
  `;
  
  const labelStyle = css`
    margin-bottom: 8px;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.fontFamily};
    font-weight: 500;
`;

  return (
    <Box css={containerStyle}>
      <Typography variant="h1" css={titleStyle}>
        F'LINK
      </Typography>
      <Typography variant="h2" css={subtitleStyle}>
        간편 회원가입
      </Typography>
      <Box component="form" onSubmit={handleSubmit} css={formStyle}>
        <Typography variant="body1" css={labelStyle}>
          성함
        </Typography>
        <TextField
          fullWidth
          placeholder="성함을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          css={textFieldStyle}
        />

        <Typography variant="body1" css={labelStyle}>
          이메일
        </Typography>
        <TextField
          fullWidth
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          css={textFieldStyle}
        />

        <Typography variant="body1" css={labelStyle}>
          F'LINK 티켓 코드
        </Typography>
        <TextField
          fullWidth
          placeholder="티켓 코드를 입력해주세요."
          value={ticketCode}
          onChange={(e) => setTicketCode(e.target.value)}
          required
          css={textFieldStyle}
        />

        <Typography variant="body1" css={labelStyle}>
          비밀번호
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          css={textFieldStyle}
        />

        <Typography variant="body1" css={labelStyle}>
          휴대폰 번호
        </Typography>
        <TextField
          fullWidth
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          css={textFieldStyle}
        />
        
        {/* 개인정보 수집 동의 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreePersonalInfo}
              onChange={() => setAgreePersonalInfo(!agreePersonalInfo)}
              sx={{
                color: palette.icon.primary,
                '& .MuiSvgIcon-root': { fontSize: '20px' },
                '&.Mui-checked': {
                  color: palette.icon.primary,
                },
                '&:hover': { backgroundColor: 'transparent' },
              }}
              icon={<CheckCircleOutlineIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          }
          label="개인정보 수집에 동의합니다."
          css={css`
            color: ${palette.text.secondary};
            font-family: ${typography.fontFamily};
            padding-left: ${spacing(1)};
            padding-right: ${spacing(2)};
          `}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              sx={{
                color: palette.icon.primary,
                '& .MuiSvgIcon-root': { fontSize: '20px' },
                '&.Mui-checked': {
                  color: palette.icon.primary,
                },
                '&:hover': { backgroundColor: 'transparent' },
              }}
              icon={<CheckCircleOutlineIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          }
          label="이용 약관에 동의합니다."
          css={css`
            color: ${palette.text.secondary};
            font-family: ${typography.fontFamily};
            padding-left: ${spacing(1)};
            padding-right: ${spacing(2)};
          `}
        />

        <Button type="submit" variant="contained" fullWidth css={buttonStyle}>
          가입 완료
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
