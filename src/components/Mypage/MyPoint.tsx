import { css, Typography, useTheme } from '@mui/material';

const MyPoint = () => {
  const { palette, typo } = useTheme();
  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
    `,
    title: css`
      ${typo.title.m}
      color: ${palette.text.primary};
    `,
    sub_primary: css`
      ${typo.sub.m}
      color: ${palette.text.primary};
      margin: 6px 0px 4px;
    `,
    sub_secondary: css`
      ${typo.sub.m}
      color: ${palette.text.secondary};
    `,
    content: css`
      display: flex;
      flex-direction: column;
      margin-top: 24px;
    `,
    column: css`
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
    `,
  };
  return (
    <div css={styles.container}>
      <Typography variant="h2" css={styles.title}>
        포인트 적립 내역
      </Typography>
      <Typography variant="h2" css={styles.sub_primary}>
        총 포인트 250P
      </Typography>
      <Typography variant="h2" css={styles.sub_secondary}>
        내 등급 BRONZE
      </Typography>

      <div css={styles.content}>
        <Column title="부스 방문" desc="OpenStack Korea" point={20} />
        <Column title="부스 방문" desc="OpenStack Korea" point={20} />
        <Column title="부스 방문" desc="OpenStack Korea" point={20} />
        <Column title="부스 방문" desc="OpenStack Korea" point={20} />
        <Column title="부스 방문" desc="OpenStack Korea" point={20} />
      </div>
    </div>
  );
};

export default MyPoint;

interface ColumnProps {
  title: string;
  desc: string;
  point: number;
}
const Column = (props: ColumnProps) => {
  const { palette, typo } = useTheme();
  const styles = {
    container: css`
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
    `,
    inner: css`
      display: flex;
      flex-direction: column;
    `,
    title: css`
      ${typo.sub.s}
      color: ${palette.text.primary};
    `,
    desc: css`
      ${typo.body.s}
      color: ${palette.text.secondary};
    `,
    point: css`
      ${typo.sub.m}
      color: ${palette.text.primary};
    `,
  };
  return (
    <div css={styles.container}>
      <div css={styles.inner}>
        <span css={styles.title}>{props.title}</span>
        <span css={styles.desc}>{props.title}</span>
      </div>
      <div css={styles.point}>+{props.point}P</div>
    </div>
  );
};
