import { css, styled, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  desc: string;
  location: string;
  hall: string;
}

const BoothColumn = ({ id, title, desc, location, hall }: Props) => {
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
      onClick={() => navigate(`/booth/${id}`)}
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
        <span>{location}</span>
      </div>
      <div
        css={css`
          ${flexrow}
          ${typo.body.s}
          color: ${palette.text.secondary};
        `}
      >
        <span>{desc}</span>
        <span>{hall}</span>
      </div>
    </div>
  );
};

export default BoothColumn;

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.quaternary,
  height: '169px',
  marginBottom: '12px',
}));
