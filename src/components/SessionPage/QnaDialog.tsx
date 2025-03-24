import Dialog from '@mui/material/Dialog';
import { Button, css, Typography, useTheme } from '@mui/material';
import TextareaBox from '@components/TextareaBox';
import CloseIcon from '@mui/icons-material/Close';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  speaker: string;
}

const QnaDialog = (props: SimpleDialogProps) => {
  const { onClose, open, title, speaker } = props;
  const { typo, palette, radius } = useTheme();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        '.MuiDialog-paper': {
          minWidth: '327px',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          borderRadius: radius.xl,
          backgroundColor: palette.background.tertiary,
          minHeight: '319px',
        },
      }}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
        `}
        onClick={onClose}
      >
        <CloseIcon />
      </div>

      <Typography
        variant="h3"
        css={css`
          ${typo.title.xs}
          color: ${palette.text.primary};
        `}
      >
        {title}
      </Typography>
      <span
        css={css`
          ${typo.body.m}
          color: ${palette.text.secondary};
          margin: 4px 0px 12px;
        `}
      >
        {speaker}
      </span>
      <TextareaBox id="" label="" max_length={400} isRequired={false} />
      <Button
        css={css`
          width: 100%;
          margin-top: 6px;
          background-color: ${palette.background.quinary};
          border: none;
          padding: 18px 0px;
          ${typo.sub.s}
          color: ${palette.text.primary};
        `}
        onClick={() => {}}
      >
        질문 제출하기
      </Button>
    </Dialog>
  );
};

export default QnaDialog;
