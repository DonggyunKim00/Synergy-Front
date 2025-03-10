import { createTheme } from '@mui/material/styles';

const customTheme = {
  color: {
    black: '#222',
    primary: '#a1c4fd',
    gray500: '#555',
  },
  fontSize: {
    small: '14px',
    medium: '16px',
    title: '42px',
    subtitle: '20px',
  },
  border: {
    primary: '#e5e7eb',
  },
} as const;

export type CustomThemeType = typeof customTheme;

const theme = createTheme({
  palette: {
    primary: {
      main: '#a1c4fd',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    h1: {
      fontSize: '42px',
    },
    h2: {
      fontSize: '20px',
    },
    body1: {
      fontSize: '14px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: '2px solid #ddd',
          backgroundColor: 'white',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard',
        },
      },
    },
  },
  custom: customTheme,
});

export default theme;
