import { Box, Typography, Paper } from '@mui/material';
import { css, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useConferenceUsers } from '@stores/server/conference';

const UserCount = ({
  title,
  count,
}: {
  title: string;
  count?: number | string;
}) => {
  const theme = useTheme();

  return (
    <Paper
      css={css`
        display: flex;
        align-items: center;
        gap: 10px;
        color: ${theme.palette.text.primary};
        border-radius: ${theme.radius.md}px;
        background-color: transparent;
        border: 1px solid ${theme.palette.border.primary};
        overflow: hidden;
        width: 100%;
        height: 60px;
      `}
    >
      <Box
        css={css`
          display: flex;
          align-items: center;
          padding-left: 12px;
        `}
      >
        <PeopleAltIcon sx={{ color: theme.palette.text.quaternary }} />
      </Box>
      <Box
        css={css`
          flex-grow: 1;
          padding: 14px 12px;
        `}
      >
        <Typography
          variant="body1"
          css={css`
            color: ${theme.palette.text.quaternary};
            font-family: ${theme.typography.fontFamily};
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            overflow: hidden;
            white-space: nowrap;
          `}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          css={css`
            color: #f5f5f5;
            font-family: ${theme.typography.fontFamily};
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          `}
        >
          {count ?? '정보 없음'}
        </Typography>
      </Box>
    </Paper>
  );
};

const UserCounts = () => {
  const {
    data: { data: counts },
  } = useConferenceUsers();

  return (
    <Box
      css={css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        padding: 5px;
      `}
    >
      <UserCount title="세션 참여자 수" count={counts.sessionAttendeeCount} />
      <UserCount title="부스 참여자 수" count={counts.boothAttendeeCount} />
      <UserCount
        title="행사 참가자 수"
        count={counts.conferenceAttendeeCount}
      />
      <UserCount title="서비스 가입자 수" count={counts.serviceAttendeeCount} />
    </Box>
  );
};

export default UserCounts;
