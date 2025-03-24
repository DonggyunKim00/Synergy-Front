import { css, styled, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  speaker: string;
  startTime: string;
  sessionTime: string;
}

const SessionColumn = ({
  id,
  title,
  speaker,
  startTime,
  sessionTime,
}: Props) => {
  const { palette, typo } = useTheme();
  const navigate = useNavigate();
  const flexrow = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `;
  return (
    <div
      css={css`
        width: 100%;
        cursor: pointer;
      `}
      onClick={() => navigate(`/session/${id}`)}
    >
      <StyledImage src="" />
      <div
        css={css`
          ${flexrow}
          ${typo.sub.s}
          color: ${palette.text.primary};
        `}
      >
        <span>{title}</span>
        <span>{startTime}</span>
      </div>
      <div
        css={css`
          ${flexrow}
          ${typo.body.s}
          color: ${palette.text.secondary};
        `}
      >
        <span>{speaker}</span>
        <span>{sessionTime}</span>
      </div>
    </div>
  );
};

export default SessionColumn;

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.quaternary,
  height: '169px',
  marginBottom: '12px',
}));
