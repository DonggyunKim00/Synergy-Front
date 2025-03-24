import { ButtonBase, css, Typography, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
interface Props {
  backgroundColor: string;
  onClick: () => void;
  text?: string;
}

const BackHeader = ({ backgroundColor, onClick, text }: Props) => {
  const { typo, palette } = useTheme();

  return (
    <header
      css={css`
        display: flex;
        gap: 10px;
        align-items: center;
        position: sticky;
        top: 0;
        width: 100%;
        max-width: 600px;
        z-index: 100;
        padding: 18px 16px;
        background-color: ${backgroundColor};
      `}
    >
      <ButtonBase onClick={onClick}>
        <ArrowBackIosNewIcon
          fontSize={'small'}
          css={css`
            color: ${palette.icon.primary};
          `}
        />
      </ButtonBase>
      {text && (
        <Typography
          variant="h3"
          color={palette.text.primary}
          fontFamily={typo.fontFamily.Montserrat}
          css={css`
            ${typo.sub.s}
          `}
        >
          {text}
        </Typography>
      )}
    </header>
  );
};

export default BackHeader;
