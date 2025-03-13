import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { css, useTheme } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: 로그아웃 로직
    navigate('/role-selection');
  };

  const logoStyle = css`
    flex-grow: 1;
    background-color: transparent;
    padding: 5px 10px;
    font-size: 1.25rem;
    font-weight: bold;
    color: ${theme.palette.text.primary};
  `;

  const navLinkStyle = (active: boolean) => css`
    color: ${theme.palette.text.primary};
    text-decoration: none;
    position: relative;
    padding: 8px 16px;
    border-radius: 4px;
    &:hover {
      text-decoration: underline;
    }
    ${active &&
    `
      font-weight: bold;
      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: white;
      }
      &:hover {
        text-decoration: none;
      }
    `}
  `;

  const logoutButtonStyle = css`
    color: ${theme.palette.text.primary};
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 1rem;
    &:hover {
      text-decoration: underline;
    }
  `;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography variant="h6" css={logoStyle}>
          F'LINK
        </Typography>
        <Box>
          <Link
            to="/admin"
            css={navLinkStyle(location.pathname === '/admin')}
          >
            대시보드
          </Link>
          <button css={logoutButtonStyle} onClick={handleLogout}>
            로그아웃
          </button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
