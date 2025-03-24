import DefaultHeader from '@components/headers/DefaultHeader';
import SessionColumn from '@components/SessionPage/SessionColumn';
import { css, styled, Typography, useTheme } from '@mui/material';

const json = {
  data: [
    {
      id: 1,
      title: '디지털 시대의 리더십과 팀 빌딩',
      speaker: '이종현, FlowLink HR 팀 총괄',
      startTime: '10:30',
      sessionTime: '1시간',
    },
    {
      id: 2,
      title: '클라우드 네이티브, 아키텍처의 미래',
      speaker: '박찬영, 클라우드 솔루션 전문가',
      startTime: '14:00',
      sessionTime: '1시간',
    },
  ],
};

const SessionPage = () => {
  const { palette, typo } = useTheme();
  return (
    <>
      <DefaultHeader backgroundColor={palette.background.primary} />
      <Wrapper>
        <Typography
          css={css`
            color: ${palette.text.primary};
            ${typo.title.l}
            margin-bottom: 26px;
          `}
        >
          오늘의 세션
        </Typography>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 24px;
          `}
        >
          {json.data.map((item) => (
            <SessionColumn {...item} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default SessionPage;

const Wrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '38px 16px 16px',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
