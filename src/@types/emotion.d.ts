import '@emotion/react';
import { ColorsTypes, FontSizeTypes, BordersTypes } from '../styles/theme';

declare module '@emotion/react' {
	export interface Theme {
		color: Record<ColorsTypes, string>;
		fontSize: Record<FontSizeTypes, string>;
		border: Record<BordersTypes, string>;
	}
}
