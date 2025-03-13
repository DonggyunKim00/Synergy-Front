import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { css, useTheme } from '@mui/material';

const FindId = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typography, shape, spacing } = theme;

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

  const containerStyle = css`
    width: 300px;
    margin: 20px auto;
    text-align: center;
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: bold;
    margin-bottom: ${spacing(1)};
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
  `;

  const subtitleStyle = css`
    font-size: 26px;
    margin-bottom: ${spacing(3)};
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
  `;

  const formStyle = css`
    width: 100%;
  `;

  const textFieldStyle = css`
    margin-bottom: ${spacing(2)};
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
  `;

  const buttonStyle = css`
    width: 100%;
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
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
    font-weight: 500;
    text-align: left;
  `;

  if (showResult) {
    return (
      <Box css={containerStyle}>
        <Typography variant="h1" css={titleStyle}>
          F'LINK
        </Typography>
        <Typography variant="h2" css={subtitleStyle}>
          아이디 찾기
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            marginBottom: '20px',
            color: theme.palette.text.primary,
          }}
        >
          회원님의 아이디는 <strong>{userId}</strong> 입니다.
        </Typography>
        <Button onClick={resetForm} css={buttonStyle}>
          확인
        </Button>
      </Box>
    );
  }

  return (
    <Box css={containerStyle}>
      <Typography variant="h1" css={titleStyle}>
        F'LINK
      </Typography>
      <Typography variant="h2" css={subtitleStyle}>
        아이디 찾기
      </Typography>
      <form onSubmit={handleSubmit} css={formStyle}>
        <Typography variant="body1" css={labelStyle}>
          성함
        </Typography>
        <TextField
          fullWidth
          placeholder="성함을 입력하세요."
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

        <Button type="submit" css={buttonStyle}>
          확인
        </Button>
      </form>
    </Box>
  );
};

export default FindId;
