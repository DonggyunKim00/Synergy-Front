export { color, typography, radius };

const color = {
  gray0: '#171717',
  gray100: '#1e1e1e',
  gray200: '#292929',
  gray300: '#333333',
  gray400: '#3a3a3a',
  gray500: '#434343',
  gray500a: '#43434380',
  gray600: '#949494',
  gray700: '#b2b2b2',
  gray700a: '#b2b2b280',
  gray800: '#d4d4d4',
  gray900: '#f5f5f5',
  blue0: '#094b4a',
  blue100: '#0c605f',
  blue200: '#10807f',
  blue300: '#14a09f',
  blue400: '#16aaaa',
  blue500: '#18c0bf',
  blue600: '#1bd5d4',
  blue700: '#b8f2f2',
  blue800: '#ddf9f9',
  blue900: '#e8fbfb',
  red100: '#a82a35',
  red500: '#fa3f4f',
} as const;

const typography = {
  fontFamily: {
    Pretendard: 'Pretendard',
    Montserrat: 'Montserrat',
  },
  title: {
    l: { fontSize: '26px', fontWeight: 'bold', lineHeight: 'normal' },
    m: { fontSize: '24px', fontWeight: 'bold', lineHeight: 'normal' },
    s: { fontSize: '22px', fontWeight: 'bold', lineHeight: 'normal' },
    xs: { fontSize: '20px', fontWeight: 'bold', lineHeight: 'normal' },
  },
  sub: {
    l: { fontSize: '18px', fontWeight: 'bold', lineHeight: 'normal' },
    m: { fontSize: '17px', fontWeight: 'bold', lineHeight: 'normal' },
    s: { fontSize: '16px', fontWeight: 'bold', lineHeight: 'normal' },
    xs: { fontSize: '14px', fontWeight: 'bold', lineHeight: 'normal' },
  },
  body: {
    l: { fontSize: '16px', fontWeight: 'normal', lineHeight: 'normal' },
    m: { fontSize: '14px', fontWeight: 'normal', lineHeight: 'normal' },
    s: { fontSize: '12px', fontWeight: 'normal', lineHeight: 'normal' },
  },
} as const;

const radius = {
  xl: '18px', // List, Modal, Card
  lg: '16px', // ListSet
  md: '12px', // CTA, Banner, BorderButton
  sm: '10px', // Border, Popup, Card, Image
  xs: '8px', // Input field
} as const;
