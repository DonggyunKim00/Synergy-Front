import { Box, Button, css, Typography, useTheme } from '@mui/material';
import QnaDialog from './QnaDialog';
import { useState } from 'react';

type QnaData = {
  id: number;
  name: string;
  content: string;
};

const QnaSection = ({
  isQRVerify,
  qnaData,
  onSuccess,
}: {
  isQRVerify: boolean;
  qnaData: QnaData[];
  onSuccess: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { palette, typo, radius } = useTheme();

  return (
    <div>
      <Typography
        variant="h3"
        color={palette.text.primary}
        css={css`
          ${typo.title.s}
          margin: 30px 0px 12px;
        `}
      >
        Q&A
      </Typography>
      <Box
        component={'div'}
        css={css`
          border-radius: ${radius.xl};
          background-color: ${palette.opacity.opa100};
          border: 1px solid ${palette.border.primary};
          padding: 16px;
          width: 100%;
          height: 200px;
        `}
      >
        <Box
          css={css`
            display: flex;
            flex-direction: column;
            gap: 20px;
            height: 100%;
            overflow-y: auto;
            padding-right: 10px;
          `}
        >
          {qnaData.length ? (
            qnaData.map((item) => <Question key={item.id} {...item} />)
          ) : (
            <span
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                color: palette.text.secondary,
                ...typo.body.m,
              }}
            >
              작성된 Q&A 가 없습니다. <br /> Q&A를 작성하고 포인트를 받아가세요!
            </span>
          )}
        </Box>
      </Box>
      {isQRVerify && (
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
          onClick={() => setOpen(true)}
        >
          질문 작성하기
        </Button>
      )}

      <QnaDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
        title="디지털 시대의 리더십과 팀 빌딩"
        speaker="이종현, FlowLink HR 팀 총괄에게 질문하기"
      />
    </div>
  );
};

export default QnaSection;

const Question = ({ name, content }: QnaData) => {
  const { palette, typo } = useTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `}
    >
      <span
        css={css`
          ${typo.sub.xs};
          color: ${palette.text.primary};
        `}
      >
        {name}
      </span>
      <p
        css={css`
          ${typo.body.s};
          color: ${palette.text.secondary};
        `}
      >
        {content}
      </p>
    </div>
  );
};
