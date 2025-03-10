import '@mui/material/styles';
import { CustomThemeType } from '@styles/theme';

declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomThemeType;
  }
  interface ThemeOptions {
    custom?: CustomThemeType;
  }
}
