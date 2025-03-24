import { Button, css, Typography, useTheme } from '@mui/material';
import ImageModifier from './ImageModifier';

const Information = ({ buttonClick }: { buttonClick: () => void }) => {
  const { palette, typo, radius } = useTheme();

  return (
    <>
      <ImageModifier />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Typography
          variant="h2"
          css={css`
            ${typo.title.m}
            color: ${palette.text.primary};
            margin-top: 2px;
          `}
        >
          김지원 님, 반갑습니다.
        </Typography>
        <Typography
          variant="h3"
          css={css`
            ${typo.title.xs}
            color: ${palette.text.primary};
            margin: 8px 0px 4px;
          `}
        >
          BRONZE 250P
        </Typography>
        <Typography
          variant="h3"
          css={css`
            ${typo.sub.s}
            color: ${palette.text.primary};
          `}
        >
          50P
          <span
            css={css`
              color: ${palette.text.secondary};
              margin: 0px 4px;
            `}
          >
            더모으면
          </span>
          SILVER
        </Typography>
      </div>
      <Button
        css={css`
          ${typo.sub.xs}
          padding: 10px 20px;
          background-color: ${palette.opacity.opa100};
          border-radius: ${radius.xl};
          color: ${palette.text.primary};
          border: none;
        `}
        onClick={buttonClick}
      >
        포인트 자세히 알아보기
      </Button>
    </>
  );
};

export default Information;
