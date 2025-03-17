import { createTheme } from '@mui/material/styles';
import { color, radius, typography } from './foundation';

export type RadiusType = typeof radius;
export type TypoType = typeof typography;

const theme = createTheme({
  palette: {
    name: { primary: color.red500 },
    text: {
      primary: color.gray900,
      secondary: color.gray800,
      tertiary: color.gray700,
      quaternary: color.gray600,
      inverse: color.gray0,
      warning: color.red500,
      interactive: color.blue500,
    },
    background: {
      primary: color.gray0,
      secondary: color.gray200,
      tertiary: color.gray300,
      quaternary: color.gray500,
      quinary: color.gray100,
      inverse: color.gray900,
      interactive: color.blue300,
    },
    border: {
      primary: color.gray500,
      secondary: color.gray600,
      tertiary: color.gray400,
      dark_warning: color.red100,
      interactive: '미정',
    },
    divider_custom: {
      primary: color.gray500,
      secondary: color.gray600,
      tertiary: color.gray400,
      dark_warning: color.red100,
      inverse: '미정',
      interactive: '미정',
    },
    opacity: {
      opa100: color.gray500a,
      opa200: color.gray700a,
    },
    icon: {
      primary: color.gray600,
      secondary: color.gray800,
      tertiary: color.gray900,
      inverse: color.gray0,
    },
  },
  radius,
  typo: typography,
  typography: {
    fontFamily: typography.fontFamily.Pretendard,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily.Pretendard,
          borderRadius: '8px',
          border: '2px solid #ddd',
          backgroundColor: 'white',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily.Pretendard,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily.Pretendard,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: color.gray400,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily.Pretendard,
          backgroundColor: color.gray400,
        },
      },
    },
  },
});

export default theme;
