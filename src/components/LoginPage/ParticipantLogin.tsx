import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  OutlinedInput,
} from '@mui/material';
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
    const queryString = redirectTo ? `?redirectTo=${redirectTo}` : '';
    navigate(`/signup${queryString}`);
  };

  const handleFindPasswordRedirect = () => {
    navigate('/reset-password');
  };

  const containerStyle = css`
    display: flex;
    flex-direction: column;
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
    color: ${palette.text.primary};
    background-color: ${palette.opacity.opa100};
    border-radius: 12px;
    width: 100%;
    margin-bottom: 16px;
    input {
      padding: 16px 10px;
      &::placeholder {
        color: ${palette.text.tertiary};
        opacity: 1;
      }
    }
    fieldset {
      border: 1px solid ${palette.border.secondary};
      padding: 0;
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-width: 1px;
      border-color: ${palette.border.focused};
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
    border-radius: 12px;
    margin: 14px 0px 30px;
    &:hover {
      background-color: ${palette.background.tertiary};
    }
  `;

  const linkStyle = css`
    ${typo.body.s}
    color: ${palette.text.primary};
    margin-left: 7px;
    cursor: pointer;
  `;

  const helperTextStyle = css`
    ${typo.body.s}
    color: ${palette.text.quaternary};
  `;

  const iconStyle = css`
    color: ${palette.icon.primary};
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
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
        <OutlinedInput
          id={'email'}
          placeholder={'이메일'}
          type={'email'}
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          startAdornment={<PersonIcon css={iconStyle} />}
          css={textFieldStyle}
        />
        <OutlinedInput
          id={'password'}
          placeholder={'비밀번호'}
          type={'password'}
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          startAdornment={<LockIcon css={iconStyle} />}
          css={textFieldStyle}
        />
        <Button type="submit" variant="contained" fullWidth css={buttonStyle}>
          로그인
        </Button>
      </form>
      <Box sx={{ textAlign: 'center', mt: '10px' }}>
        <Typography variant="body2" css={helperTextStyle}>
          처음이신가요?
          <Box component="span" onClick={handleSignupRedirect} css={linkStyle}>
            간편가입 하기
          </Box>
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mt: '10px' }}>
        <Typography variant="body2" css={helperTextStyle}>
          비밀번호를 잊었어요.
          <Box
            component="span"
            onClick={handleFindPasswordRedirect}
            css={linkStyle}
          >
            비밀번호 찾기
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default ParticipantLogin;
