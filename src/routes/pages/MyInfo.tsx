import BackHeader from '@components/headers/BackHeader';
import BasicInformation from '@components/MyInfoPage/BasicInformation';
import OtherInformation from '@components/MyInfoPage/OtherInformation';
import { styled, useTheme } from '@mui/material';
import { useAttendeeDetailInfo } from '@stores/server/attendee';
import { useNavigate, useParams } from 'react-router-dom';

const MyInfo = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: detailInfo } = useAttendeeDetailInfo(Number(id));

  return (
    <>
      <BackHeader
        backgroundColor={palette.background.tertiary}
        onClick={() => navigate(-1)}
      />
      <Container>
        <BasicInformation {...detailInfo.data.baseInfo} />
        <OtherInformation {...detailInfo.data.detailInfo} />
      </Container>
    </>
  );
};

export default MyInfo;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 16px 16px',
  backgroundColor: theme.palette.background.tertiary,
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
