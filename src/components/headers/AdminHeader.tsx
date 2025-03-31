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

  const headerWrapperStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  `;

  const headerInnerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    background-color: ${theme.palette.background.primary};
    padding: ${theme.spacing(2)} 1rem;
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
    <Box css={headerWrapperStyle}>
      <Box css={headerInnerStyle}>
        <button onClick={() => navigate('/admin')}>
          <Typography variant="h6" css={logoStyle}>
            Dashboard
          </Typography>
        </button>

        <Button
          variant="contained"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
          css={logoutButtonStyle}
        >
          로그아웃
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
