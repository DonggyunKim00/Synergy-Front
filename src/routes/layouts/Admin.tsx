import { Outlet, ScrollRestoration } from 'react-router-dom';
import { css, useTheme, Box } from '@mui/material';
import Header from '@components/headers/AdminHeader';
import UserCounts from '@components/AdminPage/UserCount';
import SessionParticipation from '@components/AdminPage/SessionParticipation';
import BoothParticipation from '@components/AdminPage/BoothParticipation';
import GradeRankingCard from '@components/AdminPage/GradeRankingCard';
import PointRankingCard from '@components/AdminPage/PointRankingCard';
import ConferenceRegistration from '@components/AdminPage/RegButtons';

const AdminLayout = () => {
  const { palette } = useTheme();
  return (
    <>
      <Header />
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 600px;
          height: 100vh;
          background-color: ${palette.background.primary};
          display: flex;
          flex-direction: column;
          overflow: hidden;
        `}
      >
        <div
          css={css`
            flex: 1;
            overflow-y: auto;
            padding: 100px 1rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 30px;
          `}
        >
          <UserCounts />
          <SessionParticipation />
          <BoothParticipation />
          <Box
            css={css`
              display: flex;
              gap: 30px;
              flex-wrap: wrap;
            `}
          >
            <Box css={{ flex: 1, minWidth: '250px' }}>
              <GradeRankingCard />
            </Box>
            <Box css={{ flex: 1, minWidth: '250px' }}>
              <PointRankingCard />
            </Box>
          </Box>
          <ConferenceRegistration />
          <Outlet />
        </div>
        <ScrollRestoration />
      </div>
    </>
  );
};

export default AdminLayout;

