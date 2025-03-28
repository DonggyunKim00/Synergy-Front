import { ButtonBase, css, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  onClick: () => void;
  text: string;
}
const ActionColumn = ({ onClick, text }: Props) => {
  const { palette, typo } = useTheme();
  return (
    <ButtonBase
      onClick={onClick}
      css={css`
        ${typo.sub.s}
        display: flex;
        padding: 20.5px 16px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        color: ${palette.text.primary};
        border-bottom: 1px solid ${palette.border.primary};
      `}
    >
      <span>{text}</span>
      <ChevronRightIcon fontSize="medium" />
    </ButtonBase>
  );
};

export default ActionColumn;
