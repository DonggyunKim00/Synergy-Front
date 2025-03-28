import { Box, css, useTheme } from '@mui/material';

type PointLogType = {
  createdTime: string;
  details: string;
  point: number;
  title: string;
};
interface Props {
  data: PointLogType[];
}

const RecentPoints = ({ data }: Props) => {
  const { palette } = useTheme();

  return (
    <Box width={'100%'} borderBottom={`1px solid ${palette.border.primary}`}>
      {data.map((item, idx) => (
        <Column key={idx} {...item} />
      ))}
    </Box>
  );
};

export default RecentPoints;

const Column = ({ createdTime, details, point, title }: PointLogType) => {
  const { palette, typo } = useTheme();

  return (
    <div
      css={css`
        display: flex;
        padding: 18px 16px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <span
          css={css`
            ${typo.sub.s}
            color: ${palette.text.primary};
          `}
        >
          {title}
        </span>
        <span
          css={css`
            ${typo.body.s}
            color: ${palette.text.secondary};
          `}
        >
          {details}
        </span>
      </div>
      <span
        css={css`
          ${typo.sub.m}
          color: ${palette.text.primary};
        `}
      >
        {`${point}P`}
      </span>
    </div>
  );
};
