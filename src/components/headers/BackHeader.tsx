import { ButtonBase, css, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
interface Props {
  backgroundColor: string;
  onClick: () => void;
}

const BackHeader = ({ backgroundColor, onClick }: Props) => {
  const { typo, palette } = useTheme();

  return (
    <header
      css={css`
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 600px;
        z-index: 100;
        ${typo.title.xs}
        font-family: ${typo.fontFamily.Montserrat};
        color: ${palette.text.primary};
        padding: 18px 16px;
        background-color: ${backgroundColor};
      `}
    >
      <ButtonBase onClick={onClick}>
        <ArrowBackIosNewIcon fontSize={'medium'} />
      </ButtonBase>
    </header>
  );
};

export default BackHeader;
