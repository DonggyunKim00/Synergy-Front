import { css, Box, Typography, useTheme, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRecruiterAttendees, useLikeAttendee, useUnlikeAttendee } from '@stores/server/recruiter';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

interface CardContentProps {
  filters?: {
    page?: number;
    size?: number;
    sort?: string[];
    occupations?: string;
    educationLevel?: string;
    ageGroup?: string;
    experienceLevel?: string;
    regions?: string;
    liked?: boolean;
    [key: string]: any;
  };
  onLikeUpdate?: () => void;
}

const CardContent = ({ filters }: CardContentProps) => {
  const { data } = useRecruiterAttendees({
    ...filters,
    liked: filters?.liked ?? undefined,
  });

  const location = useLocation();
  const likeMutation = useLikeAttendee();
  const unlikeMutation = useUnlikeAttendee();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const theme = useTheme();
  const { palette, typo, radius } = theme;

  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const handleLikeClick = (attendeeId: number) => {
    likeMutation.mutate(attendeeId, {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    });
  };

  const handleUnlikeClick = (attendeeId: number) => {
    unlikeMutation.mutate(attendeeId, {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    });
  };

  const handleCardClick = (attendeeId: number) => {
    navigate(`/my-info/${attendeeId}`);
  };

  const isList = location.pathname === '/recruiter/list';

  return (
    <Box
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: flex-start;
      `}
    >
      {data?.data?.list
        ?.filter((attendee: any) => isList || attendee.liked)
        .map((attendee: any) => (
          <Box
            key={attendee.attendeeId}
            css={css`
              background-color: ${palette.background.tertiary};
              display: flex;
              min-width: 166px;
              max-width: 288px;
              border-radius: ${radius.xl};
              padding: 24px;
              flex-direction: column;
              align-items: flex-start;
              flex: 1 0 0;
            `}
            onClick={() => handleCardClick(attendee.attendeeId)}
          >
            <Box
              css={css`
                display: flex;
                width: 70px;
                height: 98px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                aspect-ratio: 5/7;
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
                ${typo.title.s}
                color: ${palette.text.primary};
                margin-bottom: 4px;
              `}
            >
              {attendee.name}
            </Typography>
            <Typography
              css={css`
                font-family: ${typo.fontFamily.Pretendard};
                font-size: 14px;
                font-weight: 700;
                color: ${palette.text.primary};
                margin-bottom: 4px;
              `}
            >
              {attendee.desiredJobPosition}
            </Typography>
            <Typography
              css={css`
                ${typo.body.s}
                color: ${palette.text.primary};
              `}
            >
              {truncateText(attendee.techStacks, 15)}
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
                  ${typo.body.s}
                  color: ${palette.text.secondary};
                `}
              >
                {attendee.experienceLevel}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (attendee.liked) {
                    handleUnlikeClick(attendee.attendeeId);
                  } else {
                    handleLikeClick(attendee.attendeeId);
                  }
                }}
              >
                {attendee.liked ? (
                  <FavoriteIcon sx={{ color: '#EB5050', fontSize: 24 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: palette.text.secondary, fontSize: 24 }} />
                )}
              </IconButton>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default CardContent;
