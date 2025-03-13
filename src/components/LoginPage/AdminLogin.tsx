import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { css, useTheme } from '@mui/material';

const AdminLogin = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typography, shape, spacing } = theme;

  const [adminId, setAdminId] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 백엔드 API 호출 및 인증 처리
    console.log('관리자 ID:', adminId);
    alert('로그인 시도');
    setAdminId('');
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

  const labelStyle = css`
    margin-bottom: 8px;
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
    font-weight: 500;
    text-align: left;
  `;

  return (
    <Box css={containerStyle}>
      <Typography variant="h1" css={titleStyle}>
        F'LINK
      </Typography>
      <Typography variant="h2" css={subtitleStyle}>
        관리자 로그인
      </Typography>

      <form onSubmit={handleLogin} css={formStyle}>
        <Typography variant="body1" css={labelStyle}>
          관리자 ID
        </Typography>
        <TextField
          fullWidth
          id="adminId"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          placeholder="관리자 ID를 입력해 주세요."
          required
          css={textFieldStyle}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          css={buttonStyle}
        >
          로그인
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
