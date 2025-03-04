import { Theme } from '@emotion/react';

// 예시입니다.

const color = {
	black: '#222',
	primary: '#a1c4fd',
	gray500: '#555',
} as const;

const fontSize = {
	small: '14px',
	medium: '16px',
	title: '42px',
	subtitle: '20px',
} as const;

export const border = {
	primary: '#e5e7eb',
} as const;

export type ColorsTypes = keyof typeof color;
export type FontSizeTypes = keyof typeof fontSize;
export type BordersTypes = keyof typeof border;

const theme: Theme = {
	color,
	fontSize,
	border,
};

export default theme;
