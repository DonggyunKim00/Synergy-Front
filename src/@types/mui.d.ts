import '@mui/material/styles';
import { RadiusType, TypoType, FontType } from '@styles/theme';

declare module '@mui/material/styles' {
  interface Theme {
    radius: RadiusType;
    typo: TypoType;
  }
  interface ThemeOptions {
    radius?: RadiusType;
    typo?: TypoType;
  }

  interface TypeText {
    tertiary: string;
    quaternary: string;
    inverse: string;
    warning: string;
    interactive: string;
  }

  interface TypeBackground {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    inverse: string;
    interactive: string;
  }

  interface TypeName {
    primary: string;
  }
  interface TypeBorder {
    primary: string;
    secondary: string;
    tertiary: string;
    dark_warning: string;
    interactive: string;
  }

  interface TypeDividerCustom {
    primary: string;
    secondary: string;
    tertiary: string;
    dark_warning: string;
    inverse: string;
    interactive: string;
  }

  interface TypeOpacity {
    opa100: string;
    opa200: string;
  }

  interface TypeIcon {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  }

  interface Palette {
    name: TypeName;
    border: TypeBorder;
    divider_custom: TypeDividerCustom;
    opacity: TypeOpacity;
    icon: TypeIcon;
  }

  interface PaletteOptions {
    name?: TypeName;
    border?: TypeBorder;
    divider_custom?: TypeDividerCustom;
    opacity?: TypeOpacity;
    icon?: TypeIcon;
  }
}
