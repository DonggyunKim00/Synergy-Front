import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  IconButton,
  useTheme,
  css,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UserInfo from './UserInfo';
import { UserRankDataType } from '../GradeRankingCard';
import { translateLevel } from '@utils/ranking';
import { useNavigate } from 'react-router-dom';

interface LevelRankingProps {
  open: boolean;
  onClose: () => void;
  data: UserRankDataType[];
}

const LevelRankingList = ({ open, onClose, data }: LevelRankingProps) => {
  const { palette, typo } = useTheme();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  const handleFilterClick = (level: string) => {
    setSelectedLevel((prev) => (prev === level ? null : level));
  };

  const filteredData = selectedLevel
    ? data.filter((item) => item.membershipLevel === selectedLevel)
    : data;

  console.log(filteredData);

  const filterButtons = [
    { id: 'PLATINUM', label: '플래티넘' },
    { id: 'GOLD', label: '골드' },
    { id: 'SILVER', label: '실버' },
    { id: 'BRONZE', label: '브론즈' },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: '400px',
            height: '600px',
            borderRadius: '18px',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <DialogTitle
          css={css`
            font-family: ${typo.fontFamily.Pretendard};
            font-size: 20px;
            font-weight: bold;
            color: ${palette.text.primary};
            background-color: ${palette.background.tertiary};
            padding: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          등급별 참가자 랭킹 상세
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ color: palette.border.secondary }} />
          </IconButton>
        </DialogTitle>
        <Box
          css={css`
            background-color: ${palette.background.tertiary};
            padding: 16px 24px 0;
            flex-shrink: 0;
          `}
        >
          <Box display="flex" gap="20px" mb="14px" flexWrap="wrap">
            {filterButtons.map((button) => {
              const isSelected = selectedLevel === button.id;
              return (
                <Button
                  key={button.id}
                  size="small"
                  onClick={() => handleFilterClick(button.id)}
                  css={css`
                    border-radius: 18px;
                    background-color: ${palette.background.quaternary};
                    color: ${palette.text.primary};
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    align-self: stretch;
                    gap: 4px;
                    padding: 4px 10px;
                  `}
                >
                  {button.label}
                  {isSelected ? (
                    <CheckCircleIcon
                      sx={{
                        fontSize: '14px',
                      }}
                    />
                  ) : (
                    <CheckCircleOutlinedIcon
                      sx={{
                        fontSize: '14px',
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>
        </Box>
        <DialogContent
          css={css`
            background-color: ${palette.background.tertiary};
            padding: 0 24px 24px;
            overflow-y: auto;
            flex-grow: 1;
          `}
        >
          <Box
            display="grid"
            gridTemplateColumns="0.7fr 0.9fr 0.9fr 0.5fr"
            mb="4px"
            fontWeight="bold"
            color={palette.text.primary}
            fontSize="14px"
          >
            <span>등급</span>
            <span>참가자 이름</span>
            <span>누적 포인트</span>
            <span>상세 정보</span>
          </Box>
          <Box
            height="1px"
            width="100%"
            bgcolor={palette.border.secondary}
            mb="8px"
          />
          {filteredData.map((item, idx) => (
            <Box
              key={idx}
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr auto"
              alignItems="center"
              py="6px"
            >
              <Typography fontSize="13px">
                {translateLevel(item.membershipLevel)}
              </Typography>
              <Typography fontSize="13px">{item.attendeeName}</Typography>
              <Typography fontSize="13px">{item.totalPoints}</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(`/my-info/${item.userId}`)}
                css={css`
                  border-radius: 18px;
                  font-size: 12px;
                  padding: 2px 10px;
                  color: ${palette.text.primary};
                  background-color: ${palette.background.quaternary};
                  border-color: ${palette.divider_custom.primary};
                  min-width: auto;
                `}
              >
                열람
              </Button>
            </Box>
          ))}
        </DialogContent>
      </Dialog>

      {/* ✅ UserInfo 팝업 연결 */}
      <UserInfo open={userInfoOpen} onClose={() => setUserInfoOpen(false)} />
    </>
  );
};

export default LevelRankingList;
