import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import { css, useTheme } from '@mui/material/styles';

interface ConfirmDeleteDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) => {
  const theme = useTheme();
  const { palette, spacing, typo } = theme;

  const titleStyle = css`
    ${typo.title.s}
    color: ${palette.text.primary};
    text-align: center;
    padding-bottom: 6px;
  `;

  const descriptionStyle = css`
    ${typo.sub.l}
    text-align: center;
    color: ${palette.text.secondary};
  `;

  const actionsStyle = css`
    display: flex;
    justify-content: center;
    padding-bottom: ${spacing(2)}px;
  `;

  const buttonStyle = css`
    border-radius: 12px;
    height: 50px;
    width: 160px;
    flex: 1 0 0;
    background-color: ${palette.background.quinary};
    color: ${palette.text.primary};
    border: none;
    ${typo.sub.s}
  `;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: palette.background.tertiary,
          borderRadius: '18px',
          padding: '24px',
        },
      }}
    >
      <DialogTitle css={titleStyle}>{title}</DialogTitle>
      <DialogContent>
        <Typography css={descriptionStyle}>{description}</Typography>
      </DialogContent>
      <DialogActions css={actionsStyle}>
        <Button variant="contained" onClick={onConfirm} css={buttonStyle}>
          삭제하기
        </Button>
        <Button variant="contained" onClick={onClose} css={buttonStyle}>
          취소하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
