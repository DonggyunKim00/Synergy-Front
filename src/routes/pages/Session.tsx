import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Header from '@components/headers/AdminHeader';
import SessionBox from '@components/AdminPage/SessionBox';
import { css, useTheme } from '@mui/material/styles';
import { typography } from '@styles/foundation';
import AddIcon from '@mui/icons-material/Add';
import AddSession from '@components/AdminPage/Popup/AddSession';

const Session = () => {
  const theme = useTheme();
  const { palette, spacing } = theme;
  const [openAddSession, setOpenAddSession] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState<any | null>(null);

  const handleRegisterClick = () => {
    setMode('add');
    setEditData(null);
    setOpenAddSession(true);
  };

  const handleCloseAddSession = () => {
    setOpenAddSession(false);
  };
  
  const handleDeleteSession = () => {
    console.log('세션 삭제');
  };

  const handleEditSession = (sessionData: any) => {
    setMode('edit');
    setEditData(sessionData);
    setOpenAddSession(true);
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
    flex: 1;
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

  const sessionListStyle = css`
    display: flex;
    flex-direction: column;
    gap: ${spacing(2)}px;
  `;


  return (
    <Box css={pageStyle}>
      <Header />

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
        <Typography variant="h4" css={titleStyle}>
          세션 참여 현황
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleRegisterClick}
          css={registerButtonStyle}
        >
          세션 등록
        </Button>
      </Box>

      {/* Session List */}
      <Box css={sessionListStyle} sx={{gap: 2}}>
      <SessionBox
          date="9/15"
          place="세션 1-1"
          title="최신 기술 동향"
          time="10:30-11:30"
          speaker="김지혁"
          chartData={[]}
          onDelete={handleDeleteSession}
          onEdit={() =>
            handleEditSession({
              title: '최신 기술 동향',
              presenter: '김지혁',
              presenterRole: '수석 연구원',
              date: '9/15',
              startTime: '10:30',
              endTime: '11:30',
              sessionDescription: 'AI 및 최신 트렌드 소개 세션',
              imageFile: null,
              maxCapacity: '200',
            })
          }
        />
      </Box>

      <AddSession
        open={openAddSession}
        onClose={handleCloseAddSession}
        mode={mode}
        initialData={editData}
      />
    </Box>
  );
};

export default Session;
