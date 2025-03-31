import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { css, useTheme } from '@mui/material';
import { useLoginMutation } from '@stores/server/auth';

const ParticipantLogin = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typo, shape } = theme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get('redirectTo') || '';

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password, redirectTo });
  }; 

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleFindPasswordRedirect = () => {
    navigate('/reset-password');
  };

  const containerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Montserrat};
  `;

  const subtitleStyle = css`
    font-size: 26px;
    margin-bottom: 30px;
    text-align: center;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Pretendard};
  `;

  const textFieldStyle = css`
    margin-bottom: 20px;
    color: ${palette.text.primary};
    border-radius: 8px;
    background-color: ${palette.opacity.opa100};
    fieldset{
      border-color: ${palette.border.secondary};
    }
  `;

  const buttonStyle = css`
    width: 100%;
    padding: 15px;
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

  const linkStyle = css`
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Pretendard};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;

  `;

  const helperTextStyle = css`
    color: ${palette.text.quaternary};
    font-family: ${typo.fontFamily.Pretendard};
  `;

  const iconStyle = css`
    color: ${palette.icon.primary};
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  `

  return (
    <Box css={containerStyle}>
      <Typography variant="h1" css={titleStyle}>
        F'LINK
      </Typography>
      <Typography variant="h6" css={subtitleStyle}>
        참가자 로그인
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder=" 이메일"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <PersonIcon css={iconStyle} />,
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          css={textFieldStyle}
        />
        <TextField
          placeholder=" 비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <LockIcon css={iconStyle} />,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          css={textFieldStyle}
        />
        <Button type="submit" variant="contained" fullWidth css={buttonStyle}>
          로그인
        </Button>
      </form>
      <Box sx={{ textAlign: 'center', mt: '10px' }}>
        <Typography variant="body2" css={helperTextStyle}>
          처음이신가요?{' '}
          <Box component="span" onClick={handleSignupRedirect} css={linkStyle}>
            간편가입 하기
          </Box>
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mt: '10px' }}>
        <Typography variant="body2" css={helperTextStyle}>
          비밀번호를 잊었어요.{' '}
          {' '}
          <Box component="span" onClick={handleFindPasswordRedirect} css={linkStyle}>
            비밀번호 찾기
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default ParticipantLogin;
