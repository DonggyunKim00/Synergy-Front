import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { css, useTheme } from '@mui/material';
import { useAdminLoginMutation } from '@stores/server/auth';
import InputBox from '@components/InputBox';

const AdminLogin = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typo, radius, spacing } = theme;

  const [adminAuthCode, setAdminAuthCode] = useState('');
  const adminLoginMutation = useAdminLoginMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLoginMutation.mutate({ adminAuthCode });
    setAdminAuthCode('');
  };

  const containerStyle = css`
    display: flex;
    width: 100%;
    min-width: 375px;
    max-width: 600px;
    padding: 16px;
    flex-direction: column;
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: 700;
    font-style: normal;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Montserrat};
  `;

  const subtitleStyle = css`
    ${typo.title.l}
    color: ${palette.text.primary};
    margin-bottom: 30px;
  `;

  const buttonStyle = css`
    width: 100%;
    padding: 16px;
    ${typo.sub.s}
    border: none;
    background-color: ${palette.background.quaternary};
    color: ${palette.text.primary};
    border-radius: ${radius.md};
    margin-top: 30px;
  `;

  return (
    <Box css={containerStyle}>
      <Box textAlign={'center'}>
        <Typography variant="h1" css={titleStyle}>
          F'LINK
        </Typography>
        <Typography variant="h2" css={subtitleStyle}>
          관리자 로그인
        </Typography>
      </Box>

      <form onSubmit={handleLogin}>
        <InputBox
          id="adminId"
          label="관리자 ID"
          placeholder="관리자 ID를 입력해 주세요."
          value={adminAuthCode}
          onChange={setAdminAuthCode}
          bgColor={palette.opacity.opa100}
          fullWidth
          padding="16px"
        />
        <Button type="submit" variant="contained" fullWidth css={buttonStyle}>
          로그인
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
