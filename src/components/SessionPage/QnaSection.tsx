import { Box, Button, css, Typography, useTheme } from '@mui/material';
import QnaDialog from './QnaDialog';
import { useState } from 'react';

const json = {
  qna: [
    {
      id: 1,
      user: '김지훈',
      content:
        '디지털 환경에서는 팀원들이 자율성을 가지는 것이 중요하다고 하지만, 동시에 일정 관리와 성과를 모니터링해야 하는데, 리더로서 이 균형을 어떻게 맞춰야 할까요?',
    },
    {
      id: 2,
      user: '이동현',
      content:
        '세대별로 일하는 방식과 커뮤니케이션 스타일이 다른데, 디지털 시대의 리더가 다양한 연령대의 팀원들과 효과적으로 협업하려면 어떤 접근 방식이 필요할까요?',
    },
    {
      id: 3,
      user: '박수민',
      content:
        '재택근무가 보편화되면서 팀원 간 신뢰 형성이 어려워지는 것 같습니다. 원격 근무 환경에서도 신뢰 기반의 팀 문화를 구축하는 효과적인 방법이 있을까요?',
    },
  ],
};

const QnaSection = () => {
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
          {json.qna.map((item) => (
            <Question key={item.id} {...item} />
          ))}
        </Box>
      </Box>
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
        질문 제출하기
      </Button>

      <QnaDialog
        open={open}
        onClose={() => setOpen(false)}
        title="디지털 시대의 리더십과 팀 빌딩"
        speaker="이종현, FlowLink HR 팀 총괄에게 질문하기"
      />
    </div>
  );
};

export default QnaSection;

interface Props {
  id: number;
  user: string;
  content: string;
}
const Question = ({ user, content }: Props) => {
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
        {user}
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
