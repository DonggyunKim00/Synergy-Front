import { Box, css, Typography, useTheme } from '@mui/material';
import { POINT_EARN, POINT_SYSTEM } from 'src/constant/point-system';

const PointSystem = () => {
  const { palette, typo } = useTheme();
  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
      gap: 26px;
    `,
    title: css`
      ${typo.title.m}
      color: ${palette.text.primary};
    `,
    desc: css`
      ${typo.body.s}
      color: ${palette.text.secondary};
    `,
    sub: css`
      ${typo.sub.l}
      color: ${palette.text.primary};
    `,
    content: css`
      display: flex;
      flex-direction: column;
      gap: 14px;
    `,
  };
  return (
    <div css={styles.container}>
      <Typography variant="h2" css={styles.title}>
        포인트 자세히 알아보기
      </Typography>

      <div css={styles.content}>
        <div
          css={css`
            display: flex;
            gap: 4px;
            align-items: end;
          `}
        >
          <Typography variant="h4" css={styles.sub}>
            등급별 혜택
          </Typography>
          <span css={styles.desc}>
            *표시: 채용 희망한다고 응답한 참가자 전용
          </span>
        </div>
        {Object.entries(POINT_SYSTEM).map(
          ([level, { image, desc, content }]) => (
            <Box
              key={level}
              css={css`
                width: 100%;
                border-radius: 12px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  gap: 6px;
                  align-items: center;
                `}
              >
                <img
                  src={image}
                  alt={`${level} 등급 이미지`}
                  width={26}
                  css={css`
                    padding: 1px 5px;
                    box-sizing: content-box;
                  `}
                />
                <Typography
                  variant="body2"
                  css={css`
                    ${typo.sub.s}
                    color: ${palette.text.primary};
                  `}
                >
                  {level}
                </Typography>
                <Typography
                  variant="body2"
                  css={css`
                    ${typo.body.s}
                    color: ${palette.text.secondary};
                  `}
                >
                  {desc}
                </Typography>
              </div>
              <ul
                css={css`
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  display: flex;
                  flex-direction: column;
                  gap: 6px;
                  padding-left: 40px;
                  margin-top: 4px;
                `}
              >
                {content.map((item, idx) => (
                  <li
                    key={idx}
                    css={css`
                      ${typo.body.m}
                      color: ${palette.text.secondary};
                    `}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Box>
          ),
        )}
      </div>

      <div css={styles.content}>
        <Typography variant="h4" css={styles.sub}>
          포인트 적립 기준
        </Typography>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'8px'}
          padding={'0px 8px'}
        >
          {POINT_EARN.map((item, idx) => (
            <div
              key={idx}
              css={css`
                display: flex;
                justify-content: space-between;
                width: 100%;
                ${typo.body.m}
                color: ${palette.text.secondary};
              `}
            >
              <span>{item.text}</span>
              <span>{item.point}</span>
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default PointSystem;
