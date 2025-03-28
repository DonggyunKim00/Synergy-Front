import React from 'react';
import { css, styled, Typography, useTheme } from '@mui/material';
import { formatToHourMinute, getTimeDifferenceText } from '@utils/time';
import DefaultImage from '@assets/deafult-session-image.png';

interface Props {
  id: number;
  title: string;
  speaker: string;
  speakerPosition: string;
  startTime: string;
  endTime: string;
  image: string;
  description: string;
}

const Information = (props: Props) => {
  const { palette, typo } = useTheme();

  return (
    <div>
      <Typography
        variant="body1"
        color={palette.text.primary}
        css={css`
          ${typo.sub.s}
        `}
      >
        {`${formatToHourMinute(props.startTime)}-${formatToHourMinute(props.endTime)}`}
      </Typography>
      <Typography
        variant="h1"
        color={palette.text.primary}
        css={css`
          ${typo.title.m}
        `}
      >
        {props.title}
      </Typography>
      <Typography
        variant="body1"
        color={palette.text.secondary}
        css={css`
          ${typo.sub.xs}
          margin: 4px 0px;
        `}
      >
        {props.speaker}, {props.speakerPosition}
      </Typography>
      <Typography
        variant="body1"
        color={palette.text.tertiary}
        css={css`
          ${typo.body.s}
        `}
      >
        {getTimeDifferenceText(props.startTime, props.endTime)}
      </Typography>
      <StyledImage src={props.image || DefaultImage} />
      <p
        css={css`
          ${typo.body.m}
          color: ${palette.text.primary};
        `}
      >
        {props.description}
      </p>
    </div>
  );
};

export default Information;

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.primary,
  height: '187px',
  margin: '12px 0px 20px',
}));
