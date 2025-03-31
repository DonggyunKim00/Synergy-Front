import BoothColumn from '@components/BoothPage/BoothColumn';
import DefaultHeader from '@components/headers/DefaultHeader';
import { css, styled, Typography, useTheme } from '@mui/material';
import { useBoothList } from '@stores/server/booth';

export type BoothContent = {
  id: number;
  companyName: string;
  companyType: string;
  location: string;
  detailLocation: string;
  image: string;
};

const BoothPage = () => {
  const { palette, typo } = useTheme();
  const {
    data: { data },
  } = useBoothList();

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
          {data.content.map((item: BoothContent) => (
            <BoothColumn key={item.id} {...item} />
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
