import { Outlet, ScrollRestoration } from 'react-router-dom';
import { css, useTheme, Box } from '@mui/material';
import Header from '@components/AdminHeader';
import UserCounts from '@components/AdminPage/UserCount';
import SessionParticipation from '@components/AdminPage/SessionParticipation';
import BoothParticipation from '@components/AdminPage/BoothParticipation';
import GradeRankingCard from '@components/AdminPage/GradeRankingCard';
import PointRankingCard from '@components/AdminPage/PointRankingCard';
import ConferenceRegistration from '@components/AdminPage/RegButtons';

const AdminLayout = () => {
  const { palette } = useTheme();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100svh;
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
        box-shadow: 0 0 20px #0000000d;
        position: relative;
        background-color: ${palette.background.primary};
      `}
    >
      <Header />
      <UserCounts />
      <SessionParticipation />
      <BoothParticipation />
      <Box
        css={css`
          display: flex;
          justify-content: space-between; 
          gap: 1rem; 
        `}
      >
        <GradeRankingCard />
        <PointRankingCard />
      </Box>
      <ConferenceRegistration />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default AdminLayout;
