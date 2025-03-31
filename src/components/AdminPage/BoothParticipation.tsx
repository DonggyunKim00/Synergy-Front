import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { css, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddBooth from './Popup/AddBooth';
import { useConferenceStore } from '@stores/client/useConferenceStore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import ConferenceForm from './Popup/ConferenceForm';
import PreviewChart from './PreviewChart';
import { useDashboardBooths } from '@stores/server/dashboard';
import { useBoothList } from '@stores/server/booth';

const BoothParticipation = () => {
  const { palette, typo, radius } = useTheme();
  const navigate = useNavigate();

  const isConferenceRegistered = useConferenceStore(
    (state) => state.isConferenceRegistered,
  );
  const {
    data: { data: boothList },
  } = useBoothList();
  const {
    data: { data: boothDashboard },
  } = useDashboardBooths();

  const [showAddBooth, setShowAddBooth] = useState(false);
  const [showAddConference, setShowAddConference] = useState(false);

  const handleAddIconClick = () => {
    if (isConferenceRegistered) {
      setShowAddBooth(true);
    } else {
      setShowAddConference(true);
    }
  };

  const handleChevronClick = () => {
    if (isConferenceRegistered) {
      navigate('/admin/booth');
    } else {
      alert('컨퍼런스를 등록해주세요');
    }
  };

  const handleConferenceSubmit = (data: any) => {
    console.log('컨퍼런스 등록 완료:', data);
    useConferenceStore.getState().setConferenceRegistered(1);
    setShowAddConference(false);
  };

  return (
    <Box position="relative">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          css={css`
            color: ${palette.text.primary};
            ${typo.title.m}
          `}
        >
          부스 참여 현황
        </Typography>
        <ChevronRightIcon
          css={css`
            color: ${palette.icon.primary};
            cursor: pointer;
          `}
          onClick={handleChevronClick}
        />
      </Box>

      {!isConferenceRegistered ? (
        <Paper
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${palette.text.secondary};
            border-radius: ${radius.xl};
            background-color: ${palette.background.secondary};
            padding: 50px;
            border: ${palette.divider_custom.primary};
            cursor: pointer;
            min-height: 280px;
          `}
          onClick={handleAddIconClick}
        >
          <AddIcon
            css={css`
              font-size: 40px;
              color: ${palette.text.secondary};
              margin-bottom: 16px;
            `}
          />
          <Typography variant="body2">등록된 부스가 없습니다.</Typography>
          <Typography variant="body2">
            컨퍼런스 등록 후 확인 가능합니다.
          </Typography>
        </Paper>
      ) : !boothList.content.length ? (
        <Paper
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 280px;
            color: ${palette.text.primary};
            border-radius: ${radius.xl};
            background-color: ${palette.background.secondary};
            padding: 50px;
            border: ${palette.divider_custom.primary};
            cursor: pointer;
          `}
          onClick={handleAddIconClick}
        >
          <AddIcon
            css={css`
              font-size: 70px;
              margin-bottom: 16px;
            `}
            sx={{
              color: palette.icon.primary,
            }}
          />
          <Typography variant="body2">등록된 부스가 없습니다.</Typography>
          <Typography variant="body2">부스 등록 후 확인 가능합니다.</Typography>
        </Paper>
      ) : !boothDashboard.boothParticipateDetailDtoList.length ? (
        <Paper
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${palette.text.secondary};
            border-radius: ${radius.xl};
            background-color: ${palette.background.secondary};
            padding: 50px;
            border: ${palette.divider_custom.primary};
            min-height: 280px;
          `}
        >
          <Typography variant="body2" mb={1}>
            집계된 정보가 없습니다.
          </Typography>
        </Paper>
      ) : (
        <PreviewChart
          data={boothDashboard.boothParticipateDetailDtoList.map(
            (item: any) => ({
              title: item.companyName,
              currentDate: boothDashboard.currentDate,
              currentAttendee: item.attendeeCount,
              maximumAttendee: item.totalCount,
            }),
          )}
          isBooth
        />
      )}

      {showAddBooth && (
        <AddBooth open={showAddBooth} onClose={() => setShowAddBooth(false)} />
      )}
      {showAddConference && (
        <ConferenceForm
          mode="add"
          open={showAddConference}
          onClose={() => setShowAddConference(false)}
          onSubmit={handleConferenceSubmit}
        />
      )}
    </Box>
  );
};

export default BoothParticipation;
