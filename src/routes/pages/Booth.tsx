import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Header from '@components/headers/AdminHeader';
import BoothBox from '@components/AdminPage/BoothBox';
import { css, useTheme } from '@mui/material/styles';
import { typography } from '@styles/foundation';
import AddIcon from '@mui/icons-material/Add';
import AddBooth from '@components/AdminPage/Popup/AddBooth';

const Booth = () => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  const [isAddBoothOpen, setIsAddBoothOpen] = useState(false);
  const [editMode, setEditMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState<any | null>(null);

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

  const handleDeleteSession = () => {
    console.log('세션 삭제');
  };

  const pageStyle = css`
    display: flex;
    flex-direction: column;
    padding: ${spacing(2)};
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
        <Typography variant="h4" css={titleStyle}>
          부스 참여 현황
        </Typography>
        <Button startIcon={<AddIcon />} onClick={handleRegisterClick} css={registerButtonStyle}>
          부스 등록
        </Button>
      </Box>

      <Box css={BoothListStyle}>
        <BoothBox //임시 확인용
          date="9/15"
          place="부스 A"
          title="DevWave"
          category="AI"
          chartData={[]}
          onDelete={handleDeleteSession}
          onEdit={() =>
            handleEditBooth({
              companyName: 'DevWave',
              companyType: '스타트업',
              boothLocation: 'hallA',
              boothNumber: 'A-01',
              boothDescription: 'AI 관련 기술 소개',
              imageFile: null,
            })
          }
        />
      </Box>

      <AddBooth
        open={isAddBoothOpen}
        onClose={handleCloseAddBooth}
        mode={editMode}
        initialData={editData}
      />
    </Box>
  );
};

export default Booth;
