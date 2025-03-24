import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { css, useTheme } from '@mui/material/styles';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { typography } from '@styles/foundation';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: 로그아웃 로직
    navigate('/role-selection');
  };

  const headerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: ${theme.spacing(2)} 0;
  `;

  const logoStyle = css`
    font-weight: 800;
    font-size: 28px;
    font-family: ${typography.fontFamily.Montserrat};
    color: ${theme.palette.text.primary};
  `;

  const logoutButtonStyle = css`
    background-color: ${theme.palette.background.quaternary};
    color: ${theme.palette.text.primary};
    border-radius: 18px;
    padding: 8px 16px;
    border: none;
    .MuiSvgIcon-root {
      color: ${theme.palette.icon.tertiary};
    }
  `;

  return (
    <Box component="header" css={headerStyle}>
      <Typography variant="h6" css={logoStyle}>
        Dashboard
      </Typography>
      <Button
        variant="contained"
        startIcon={<LogoutOutlinedIcon />}
        onClick={handleLogout}
        css={logoutButtonStyle}
      >
        로그아웃
      </Button>
    </Box>
  );
};

export default Header;
