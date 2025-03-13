import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { css, useTheme } from '@mui/material';

const ParticipantLogin = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도:', email, password);
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
    font-family: ${typography.fontFamily};
  `;

  const subtitleStyle = css`
    font-size: 26px;
    margin-bottom: 30px;
    text-align: center;
    color: ${palette.text.secondary};
    font-family: ${typography.fontFamily};
  `;

  const textFieldStyle = css`
    margin-bottom: 20px;

    .MuiOutlinedInput-root {
      color: ${palette.text.primary};
      border-radius: ${shape.borderRadius}px;
      fieldset {
        border-color: ${palette.divider_custom.primary};
      }
      &:hover fieldset {
        border-color: ${palette.divider_custom.secondary};
      }
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
    cursor: pointer;
    text-decoration: none;
    color: ${palette.text.secondary};
    &:hover {
      text-decoration: underline;
      color: ${palette.primary.main};
    }
  `;

  const helperTextStyle = css`
    color: ${palette.text.quaternary};
    font-family: ${typography.fontFamily};
  `;

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
            startAdornment: <PersonIcon />,
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
            startAdornment: <LockIcon />,
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
      <Box sx={{ height: '10px' }} />
      <Button
        variant="contained"
        onClick={handleKakaoLogin}
        fullWidth
        css={css`
          ${buttonStyle}
        `}
      >
        카카오 로그인
      </Button>
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
          아이디/비밀번호를 잊었어요?{' '}
          <Box component="span" onClick={handleFindIdRedirect} css={linkStyle}>
            아이디 찾기
          </Box>{' '}
          |{' '}
          <Box component="span" onClick={handleFindPasswordRedirect} css={linkStyle}>
            비밀번호 찾기
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default ParticipantLogin;
