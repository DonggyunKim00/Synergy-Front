import { Box, Typography, useTheme, css } from '@mui/material';
import BackHeader from '@components/headers/BackHeader';
import CardContent from '@components/RecruiterPage/CardContent';
import { useRecruiterAttendees } from '@stores/server/recruiter';

const RecruiterMain = () => {
  const { palette, typo } = useTheme();
  const { data: attendeesData } = useRecruiterAttendees({ liked: true });
  const likedAttendees = attendeesData?.data?.list?.filter((attendee: any) => attendee.liked);

  return (
    <>
      <BackHeader
        backgroundColor={palette.background.primary}
        onClick={() => window.history.back()}
      />
      <Box
        css={css`
          margin-top: 26px;
          padding: 0 16px;
          background-color: ${palette.background.primary};
        `}
      >
        <Typography
          css={css`
            font-family: ${typo.fontFamily.Pretendard};
            ${typo.title.l}
            color: ${palette.text.primary};
          `}
        >
          내가 저장한 인재 ({likedAttendees.length})
        </Typography>

        <Box
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 20px;
            overflow-y: auto;
            margin-bottom: 10px;
          `}
        >
          <CardContent filters={{ liked: true }}/>
        </Box>
      </Box>
    </>
  );
};

export default RecruiterMain;
