import { Box, Typography, Paper } from '@mui/material';
import { css, useTheme } from '@mui/material';
import { useMembershipRanking } from '@stores/server/ranking';
import LevelRankingList from './Popup/LevelRankingList';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RankingModalOpenBtn from './RankingModalOpenBtn';
import { useNavigate } from 'react-router-dom';
import { translateLevel } from '@utils/ranking';

export type UserRankDataType = {
  userId: number;
  attendeeName: string;
  membershipLevel: string;
  totalPoints: number;
};

const GradeRankingCard = () => {
  const { palette, typo, radius } = useTheme();
  const navigate = useNavigate();
  const {
    data: { data },
  } = useMembershipRanking();

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
        `}
      >
        등급별 참가자 랭킹
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
              {data.content.slice(0, 8).map((item: UserRankDataType) => {
                return (
                  <div
                    key={item.userId}
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      height: 20px;
                    `}
                  >
                    <span css={{ width: '25px', marginRight: '20px' }}>
                      {translateLevel(item.membershipLevel)}
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
                      onClick={() => {
                        navigate(`/my-info/${item.userId}`);
                      }}
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

      <LevelRankingList
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data.content}
      />
    </Box>
  );
};

export default GradeRankingCard;
