import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { css, useTheme } from '@mui/material';
import { useAdminLoginMutation } from '@stores/server/auth';

const AdminLogin = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typo, shape, spacing } = theme;

  const [adminAuthCode, setAdminAuthCode] = useState('');
  const adminLoginMutation = useAdminLoginMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLoginMutation.mutate({ adminAuthCode });
    setAdminAuthCode('');
  };

  const containerStyle = css`
    width: 350px;
    margin: 20px auto;
    text-align: center;
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: bold;
    margin-bottom: ${spacing(1)};
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Montserrat};
  `;

  const subtitleStyle = css`
    font-size: 26px;
    margin-bottom: ${spacing(3)};
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Pretendard};
    font-weight: bold;
  `;

  const formStyle = css`
    width: 100%;
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
  `;

  const labelStyle = css`
    margin-bottom: 8px;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Pretendard};
    font-weight: 500;
    text-align: left;
    font-size: 16px;
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
          value={adminAuthCode}
          onChange={(e) => setAdminAuthCode(e.target.value)}
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
