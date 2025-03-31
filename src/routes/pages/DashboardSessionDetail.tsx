import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Header from '@components/headers/AdminHeader';
import SessionBox from '@components/AdminPage/SessionBox';
import { css, useTheme } from '@mui/material/styles';
import { typography } from '@styles/foundation';
import AddIcon from '@mui/icons-material/Add';
import AddSession from '@components/AdminPage/Popup/AddSession';
import { useDashboardSessionDetail } from '@stores/server/dashboard';
import { useDeleteSession } from '@stores/server/session';

export interface SessionData {
  sessionId: number;
  title: string;
  progressDate: string;
  startDate: string;
  endDate: string;
  qrUrl: string;
  dataset: any[];
  speaker: string;
}

const DashboardSessionDetail = () => {
  const theme = useTheme();
  const { palette, spacing } = theme;
  const [openAddSession, setOpenAddSession] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [editData, setEditData] = useState<any | null>(null);
  const {
    data: { data: sessions },
  } = useDashboardSessionDetail();

  const { mutate: deleteMutate } = useDeleteSession();

  console.log(sessions);

  const handleRegisterClick = () => {
    setMode('add');
    setEditData(null);
    setOpenAddSession(true);
  };

  const handleCloseAddSession = () => {
    setOpenAddSession(false);
  };

  const handleDeleteSession = (sessionId: number) => {
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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={2}
      >
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
      {sessions.length === 0 ? (
        <Typography
          variant="body2"
          css={css`
            text-align: center;
            margin-top: ${spacing(4)};
            color: ${palette.text.secondary};
          `}
        >
          등록된 세션이 없습니다.
        </Typography>
      ) : (
        <Box css={sessionListStyle} sx={{ gap: spacing(2) }}>
          {sessions.map((session: SessionData) => (
            <SessionBox
              key={session.sessionId}
              {...session}
              onDelete={() => deleteMutate(session.sessionId)}
              onEdit={() => handleEditSession(session)}
            />
          ))}
        </Box>
      )}

      <AddSession
        open={openAddSession}
        onClose={handleCloseAddSession}
        mode={mode}
        initialData={editData}
      />
    </Box>
  );
};

export default DashboardSessionDetail;
