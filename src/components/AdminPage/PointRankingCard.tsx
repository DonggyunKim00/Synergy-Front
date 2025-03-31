import { Box, Typography, Paper } from '@mui/material';
import { css, useTheme } from '@mui/material';
import PointRankingList from './Popup/PointRankingList';
import { useState } from 'react';
import { usePointRanking } from '@stores/server/ranking';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RankingModalOpenBtn from './RankingModalOpenBtn';
import { useNavigate } from 'react-router-dom';

export type UserPointDataType = {
  attendeeId: number;
  attendeeName: string;
  totalPoints: number;
};

const GradeRankingCard = () => {
  const { palette, typo, radius } = useTheme();
  const navigate = useNavigate();
  const {
    data: { data },
  } = usePointRanking();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Box
      css={css`
        width: 100%;
      `}
    >
      <Typography
        variant="subtitle1"
        css={css`
          ${typo.title.m}
          color: ${palette.text.primary};
          margin-bottom: 8px;
          text-align: left;
        `}
      >
        누적 포인트 랭킹
      </Typography>
      <Paper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        css={css`
          position: relative;
          background-color: ${palette.background.secondary};
          border-radius: ${radius.xl};
          padding: 24px;
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        {data.content.length ? (
          <>
            <Box
              css={css`
                display: flex;
                flex-direction: column;
                gap: 10px;
                color: ${palette.text.primary};
                width: 100%;
                height: 100%;
              `}
            >
              {data.content
                .slice(0, 8)
                .map((item: UserPointDataType, idx: number) => {
                  return (
                    <div
                      key={idx}
                      css={css`
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 20px;
                      `}
                    >
                      <span css={{ width: '10px', marginRight: '20px' }}>
                        {idx + 1}
                      </span>
                      <span css={{ width: '80px', textAlign: 'start' }}>
                        {item.attendeeName}
                      </span>
                      <span>{item.totalPoints}P</span>
                      <button
                        css={css`
                          position: relative;
                          top: -2px;
                          left: 10px;
                        `}
                        onClick={() => navigate(`/my-info/${item.attendeeId}`)}
                      >
                        <ChevronRightIcon
                          fontSize="small"
                          sx={{
                            color: palette.icon.primary,
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
            </Box>
            <RankingModalOpenBtn
              visible={isHovered}
              setModalOpen={() => setModalOpen(true)}
            />
          </>
        ) : (
          <Typography
            variant="body2"
            css={css`
              ${typo.body.l}
              color: ${palette.text.secondary};
            `}
          >
            집계된 사용자가 없습니다.
          </Typography>
        )}
      </Paper>

      <PointRankingList
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data.content}
      />
    </Box>
  );
};

export default GradeRankingCard;
