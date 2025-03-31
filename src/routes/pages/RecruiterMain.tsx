import { Box, Typography, useTheme, css } from '@mui/material';
import BackHeader from '@components/headers/BackHeader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRecruiterAttendees } from '@stores/server/recruiter';

const RecruiterMain = () => {
  const { palette, typo } = useTheme();
  const { data } = useRecruiterAttendees({});

  const likedAttendees = data.data.list.filter((attendee: any) => attendee.liked);
  
  return (
    <>
      <BackHeader
        backgroundColor={palette.background.primary}
        onClick={() => window.history.back()}
      />
      <Box
        css={css`
          padding: 0 10px;
          background-color: ${palette.background.primary};
        `}
      >
        <Typography
          css={css`
            font-family: ${typo.fontFamily.Pretendard};
            font-size: 26px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            color: ${palette.text.primary};
          `}
        >
          내가 저장한 인재
        </Typography>

        <Box
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 20px;
            overflow-y: auto;
          `}
        >
          {likedAttendees.map((attendee: any) => (
            <Box
              key={attendee.attendeeId}
              css={css`
                background-color: ${palette.background.tertiary};
                display: flex;
                min-width: 166px;
                max-width: 288px;
                border-radius: 18px;
                padding: 24px;
                flex-direction: column;
                align-items: flex-start;
                flex: 1 0 0;
              `}
            >
              <Box
                css={css`
                  display: flex;
                  width: 70px;
                  height: 98px;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  aspect-ratio: 5/7
                  overflow: hidden;
                  margin-bottom: 10px;
                `}
              >
                <img
                  src={attendee.profileImageUrl}
                  alt={`${attendee.name} 프로필 이미지`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              <Typography
                css={css`
                  font-size: 16px;
                  font-weight: 700;
                  color: ${palette.text.primary};
                  margin-bottom: 4px;
                `}
              >
                {attendee.name}
              </Typography>
              <Typography
                css={css`
                  font-size: 14px;
                  font-weight: 500;
                  color: ${palette.text.primary};
                  margin-bottom: 4px;
                `}
              >
                {attendee.desiredJobPosition}
              </Typography>
              <Typography
                css={css`
                  font-size: 12px;
                  color: ${palette.text.primary};
                  margin-bottom: 12px;
                  line-height: 1.4;
                `}
              >
                {attendee.techStacks}
              </Typography>

              <Box
                css={css`
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                `}
              >
                <Typography
                  css={css`
                    font-size: 12px;
                    color: ${palette.text.secondary};
                  `}
                >
                  {attendee.experienceLevel}
                </Typography>
                <FavoriteIcon sx={{ color: '#EB5050', fontSize: 18 }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default RecruiterMain;