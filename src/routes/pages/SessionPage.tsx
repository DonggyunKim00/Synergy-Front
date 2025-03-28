import DefaultHeader from '@components/headers/DefaultHeader';
import SessionColumn from '@components/SessionPage/SessionColumn';
import { css, styled, Typography, useTheme } from '@mui/material';
import { useSessionList } from '@stores/server/session';

export type SessionContent = {
  id: number;
  imageUrl: string;
  title: string;
  speaker: string;
  speakerPosition: string;
  startTime: string;
  endTime: string;
};

const SessionPage = () => {
  const { palette, typo } = useTheme();
  const {
    data: { data },
  } = useSessionList();

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
          {data.map((item: SessionContent) => (
            <SessionColumn key={item.id} {...item} />
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
