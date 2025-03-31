import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { css, useTheme } from '@mui/material';
import loginBackground from '@assets/background/login-bg.png';

const RoleSelectionPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { palette, typo, shape, breakpoints } = theme;

  const handleRoleSelection = (roleName: string) => {
    if (roleName === '참가자') {
      navigate('/participant-login');
    } else if (roleName === '관리자') {
      navigate('/admin-login');
    }
  };

  const containerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 812px;
    min-width: 375px;
    max-width: 600px;
    padding: 16px;
    background-image: url(${loginBackground});
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: 700;
    text-align: center;
    font-style: normal;
    font-height: normal;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Montserrat};
    width: 100%;
    height: Auto;
    }
  `;

  const subtitleStyle = css`
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    font-style: noraml;
    line-height: normal;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Montserrat};
    margin-bottom: 30px;
  `;

  const buttonStyle = css`
    display: flex;
    width: 100%;
    height: 54px;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    font-family: ${typo.fontFamily.Pretendard};
    border:none;
    border-radius: 12px;
    background: var(--opacity-opa100, rgba(67, 67, 67, 0.50));
    color: ${palette.text.primary};
    margin-bottom: 14px;
  `;

  return (
    <Box css={containerStyle}>
      <Typography css={titleStyle}>
        F'LINK
      </Typography>

      <Typography css={subtitleStyle}>
        FLINK 2025
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleRoleSelection('참가자')}
        css={buttonStyle}
      >
        참가자
      </Button>

      <Button
        variant="contained"
        onClick={() => handleRoleSelection('관리자')}
        css={buttonStyle}
      >
        관리자
      </Button>
    </Box>
  );
};

export default RoleSelectionPage;
