import Dialog from '@mui/material/Dialog';
import { Button, css, Typography, useTheme } from '@mui/material';
import TextareaBox from '@components/TextareaBox';
import CloseIcon from '@mui/icons-material/Close';
import { useSessionQna } from '@stores/server/attendee';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  speaker: string;
  onSuccess: () => void;
}

const QnaDialog = (props: SimpleDialogProps) => {
  const { onClose, onSuccess, open, title, speaker } = props;
  const { id: sessionId } = useParams();
  const { typo, palette, radius } = useTheme();

  const { qnaMutation } = useSessionQna(Number(sessionId));
  const [content, setContent] = useState('');

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
      <TextareaBox
        id="qna"
        label=""
        max_length={400}
        isRequired={false}
        onChange={(value) => setContent(value)}
        placeholder="질문을 400자 이내로 작성해주세요."
      />
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
        onClick={() => {
          if (content.length < 10) {
            alert('질문은 10자 이상 입력해야 합니다.');
          } else {
            qnaMutation.mutate({ content });
            onClose();
            onSuccess();
          }
        }}
      >
        질문 제출하기
      </Button>
    </Dialog>
  );
};

export default QnaDialog;
