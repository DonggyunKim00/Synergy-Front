import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { css, useTheme } from '@mui/material';

const RoleSelectionPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { palette, typography, shape, breakpoints } = theme;

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
    min-height: 100vh;
  `;

  const titleStyle = css`
    font-size: 48px;
    font-weight: bold;
    margin-bottom: ${theme.spacing(2)};
    text-align: center;
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
    ${breakpoints.down('md')} {
      font-size: 74px;
    }
  `;

  const subtitleStyle = css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: ${theme.spacing(4)};
    text-align: center;
    color: ${palette.text.secondary};
    font-family: ${typography.fontFamily};
    ${breakpoints.down('md')} {
      font-size: 26px;
    }
  `;

  const buttonStyle = css`
    width: 300px;
    padding: 15px;
    margin-bottom: ${theme.spacing(2)};
    font-size: 16px;
    font-weight: bold;
    border:none;
    background-color: ${palette.background.quaternary};
    color: ${palette.text.primary};
    border-radius: ${shape.borderRadius}px;
    &:hover {
      background-color: ${palette.background.tertiary};
    }
    ${breakpoints.down('md')} {
      width: 300px;
      padding: 10px;
      font-size: 14px;
    }
  `;

  return (
    <Box css={containerStyle}>
      <Typography variant="h1" css={titleStyle}>
        F'LINK
      </Typography>

      <Typography variant="h2" css={subtitleStyle}>
        FLINK2025
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
