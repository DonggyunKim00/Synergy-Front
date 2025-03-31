import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Header from '@components/headers/AdminHeader';
import BoothBox from '@components/AdminPage/BoothBox';
import { css, useTheme } from '@mui/material/styles';
import { typography } from '@styles/foundation';
import AddIcon from '@mui/icons-material/Add';
import AddBooth from '@components/AdminPage/Popup/AddBooth';
import { useDashboardBoothDetail } from '@stores/server/dashboard';
import { useDeleteBooth } from '@stores/server/booth';

export interface BoothData {
  boothId: number;
  boothLocation: string;
  boothNumber: string;
  companyName: string;
  companyType: string;
  dataset: any[];
  progressDate: string;
  qrCode: string;
}

const DashboardBoothDetail = () => {
  const theme = useTheme();
  const { palette, spacing } = theme;
  const [isAddBoothOpen, setIsAddBoothOpen] = useState(false);
  const [editMode, setEditMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState<any | null>(null);

  const {
    data: { data: booths },
  } = useDashboardBoothDetail();

  const { mutate: deleteMutate } = useDeleteBooth();

  const handleRegisterClick = () => {
    setEditMode('add');
    setEditData(null);
    setIsAddBoothOpen(true);
  };

  const handleCloseAddBooth = () => {
    setIsAddBoothOpen(false);
  };

  const handleEditBooth = (boothInfo: any) => {
    setEditMode('edit');
    setEditData(boothInfo);
    setIsAddBoothOpen(true);
  };

  const handleDeleteBooth = (boothId: number) => {
    console.log('부스 삭제');
  };

  const pageStyle = css`
    display: flex;
    flex-direction: column;
    padding: ${spacing(2)};
    padding-top: 80px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  const titleStyle = css`
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily.Pretendard};
    font-size: 26px;
    font-weight: bold;
  `;

  const registerButtonStyle = css`
    background-color: transparent;
    color: ${palette.text.quaternary};
    border-color: ${palette.border.secondary};
    border-radius: 18px;
    padding: 8px 16px;
    border: 1px solid ${palette.border.secondary};
  `;

  const BoothListStyle = css`
    display: flex;
    flex-direction: column;
    gap: ${spacing(2)}px;
  `;

  return (
    <Box css={pageStyle}>
      <Header />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={2}
      >
        <Typography variant="h4" css={titleStyle}>
          부스 참여 현황
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleRegisterClick}
          css={registerButtonStyle}
        >
          부스 등록
        </Button>
      </Box>

      {booths.length === 0 ? (
        <Typography
          variant="body2"
          css={css`
            text-align: center;
            margin-top: ${spacing(4)};
            color: ${palette.text.secondary};
          `}
        >
          등록된 부스가 없습니다.
        </Typography>
      ) : (
        <Box css={BoothListStyle} sx={{ gap: spacing(2) }}>
          {booths.map((booth: BoothData) => (
            <BoothBox
              key={booth.boothId}
              onDelete={() => deleteMutate(booth.boothId)}
              onEdit={() => handleEditBooth(booth)}
              {...booth}
            />
          ))}
        </Box>
      )}

      <AddBooth
        open={isAddBoothOpen}
        onClose={handleCloseAddBooth}
        mode={editMode}
        initialData={editData}
      />
    </Box>
  );
};

export default DashboardBoothDetail;
