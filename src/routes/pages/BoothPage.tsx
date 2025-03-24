import BoothColumn from '@components/BoothPage/BoothColumn';
import DefaultHeader from '@components/headers/DefaultHeader';
import { css, styled, Typography, useTheme } from '@mui/material';

const json = {
  data: [
    {
      id: 1,
      title: 'CodeSphere',
      desc: '클라우드 서비스',
      location: '234C',
      hall: 'C HALL',
    },
    {
      id: 2,
      title: 'OpenStack Korea',
      desc: '클라우드 오픈소스',
      location: '456C',
      hall: 'C HALL',
    },
  ],
};

const BoothPage = () => {
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
          기업 부스 둘러보기
        </Typography>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 24px;
          `}
        >
          {json.data.map((item) => (
            <BoothColumn {...item} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default BoothPage;

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
