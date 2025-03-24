import { css, useTheme } from '@mui/material';

interface Props {
  backgroundColor: string;
}

const DefaultHeader = ({ backgroundColor }: Props) => {
  const { typo, palette } = useTheme();

  return (
    <header
      css={css`
        position: sticky;
        top: 0;
        width: 100%;
        max-width: 600px;
        z-index: 100;
        ${typo.title.xs}
        font-family: ${typo.fontFamily.Montserrat};
        color: ${palette.text.primary};
        background-color: ${backgroundColor};
        padding: 18px 16px;
      `}
    >
      F’LINK 2025
    </header>
  );
};

export default DefaultHeader;
