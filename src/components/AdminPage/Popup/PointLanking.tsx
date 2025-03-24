import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  useTheme,
  css,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PointRankingProps {
  open: boolean;
  onClose: () => void;
}

const dummyPointData = [
  { rank: 1, name: '김구름', points: '000' },
  { rank: 1, name: '박푸디', points: '000' },
  { rank: 1, name: '이사과', points: '000' },
  { rank: 1, name: '최딸기', points: '000' },
  { rank: 1, name: '홍수박', points: '000' },
  { rank: 1, name: '강블루', points: '000' },
  { rank: 1, name: '하초코', points: '000' },
  { rank: 1, name: '문라떼', points: '000' },
  { rank: 1, name: '이프디', points: '000' },
  { rank: 1, name: '최프디', points: '000' },
  { rank: 1, name: '김프디', points: '000' },
  { rank: 1, name: '박프디', points: '000' },
  { rank: 1, name: '정프디', points: '000' },
  { rank: 1, name: '주프디', points: '000' },
];

const PointRanking = ({ open, onClose }: PointRankingProps) => {
  const { palette, typo } = useTheme();

  return (
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
        누적 포인트 랭킹 상세
        <IconButton onClick={onClose} size="small">
          <CloseIcon sx={{ color: palette.border.secondary }} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        css={css`
          background-color: ${palette.background.tertiary};
          padding: 16px 24px 24px;
          overflow-y: auto;
          flex-grow: 1;
        `}
      >
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr auto"
          mb="4px"
          fontWeight="bold"
          color={palette.text.primary}
          fontSize="14px"
        >
          <span>순위</span>
          <span>참가자 이름</span>
          <span>누적 포인트</span>
        </Box>
        <Box height="1px" width="100%" bgcolor={palette.border.secondary} mb="8px" />
        {dummyPointData.map((item, idx) => (
          <Box
            key={idx}
            display="grid"
            gridTemplateColumns="1fr 1fr auto"
            alignItems="center"
            py="6px"
          >
            <Typography fontSize="13px">{item.rank}</Typography>
            <Typography fontSize="13px">{item.name}</Typography>
            <Typography fontSize="13px">{item.points}</Typography>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default PointRanking;
