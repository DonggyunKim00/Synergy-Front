import { css, useTheme } from '@mui/material';

const RecentPoints = () => {
  const json = {
    data: [
      {
        title: '부스 방문',
        desc: 'OpenStack Korea',
        point: 20,
      },
      {
        title: '세션 참여',
        desc: '디지털 시대의 리더십과 팀 빌딩',
        point: 30,
      },
      {
        title: '부스 방문',
        desc: 'CodeSphere',
        point: 20,
      },
    ],
  };
  return (
    <>
      {json.data.map((item) => (
        <Column {...item} />
      ))}
    </>
  );
};

export default RecentPoints;

interface Props {
  title: string;
  desc: string;
  point: number;
}
const Column = ({ title, desc, point = 0 }: Props) => {
  const { palette, typo } = useTheme();

  return (
    <div
      css={css`
        display: flex;
        padding: 14px 16px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        border-bottom: 1px solid ${palette.border.primary};
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
          {desc}
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
