import { css, Typography, useTheme } from '@mui/material';

const CompanyList = () => {
  const { palette, typo } = useTheme();
  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
    `,
    title: css`
      ${typo.title.m}
      color: ${palette.text.primary};
      margin-bottom: 6px;
    `,
    caption: css`
      ${typo.body.m}
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
        내 정보를 저장한 기업
      </Typography>
      <Typography variant="h2" css={styles.caption}>
        기업 부스를 검색하고 해당 기업 부스에 방문해보세요!
      </Typography>

      <div css={styles.content}>
        <Column title="CodeSphere" desc="HR팀 매니저, 박수진" />
        <Column title="OpenStack Korea" desc="HR팀 매니저, 김주은" />
      </div>
    </div>
  );
};

export default CompanyList;

interface ColumnProps {
  title: string;
  desc: string;
}
const Column = (props: ColumnProps) => {
  const { palette, typo } = useTheme();
  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
      padding: 13.5px 0px;
    `,
    title: css`
      ${typo.sub.s}
      color: ${palette.text.primary};
    `,
    desc: css`
      ${typo.body.s}
      color: ${palette.text.secondary};
    `,
  };
  return (
    <div css={styles.container}>
      <span css={styles.title}>{props.title}</span>
      <span css={styles.desc}>{props.title}</span>
    </div>
  );
};
