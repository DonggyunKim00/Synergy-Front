export { color, typography, radius };

const color = {
  gray0: '#171717',
  gray0a: '#000000B3',
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
  blue100: '#307484',
  blue500: '#5CB0C5',
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
