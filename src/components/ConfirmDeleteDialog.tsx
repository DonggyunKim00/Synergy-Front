import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { css, useTheme } from '@mui/material/styles';

interface ConfirmDeleteDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog = ({ open, title, description, onClose, onConfirm }: ConfirmDeleteDialogProps) => {
  const theme = useTheme();
  const { palette, spacing, typo } = theme;

  const titleStyle = css`
    font-family: ${typo.fontFamily.Pretendard};
    font-size: 22px;
    font-weight: 700;
    text-align: center;
  `;

  const descriptionStyle = css`
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
  `;

  const deleteButtonStyle = css`
    ${buttonStyle}
    background-color: ${palette.background.inverse};
    color: ${palette.text.inverse};
    border: none;
  `;

  const cancelButtonStyle = css`
    ${buttonStyle}
    background-color: ${palette.background.quinary};
    color: ${palette.text.primary};
    border: none;
  `;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
    PaperProps={{
        sx: {
          backgroundColor: palette.background.quaternary,
        },
    }}
    >
      <DialogTitle css={titleStyle}>{title}</DialogTitle>
      <DialogContent>
        <Typography css={descriptionStyle}>{description}</Typography>
      </DialogContent>
      <DialogActions css={actionsStyle}>
        <Button variant="contained" onClick={onConfirm} css={deleteButtonStyle}>
          삭제하기
        </Button>
        <Button variant="contained" onClick={onClose} css={cancelButtonStyle}>
          취소하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
