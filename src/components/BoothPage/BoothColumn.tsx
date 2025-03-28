import { css, styled, useTheme } from '@mui/material';
import { BoothContent } from '@routes/pages/BoothPage';
import { useNavigate } from 'react-router-dom';
import DefaultImage from '@assets/default-booth-image.png';

const BoothColumn = ({
  id,
  companyName,
  companyType,
  boothLocation,
  boothNumber,
  image,
}: BoothContent) => {
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
      <StyledImage src={image.trim() || DefaultImage} />
      <div
        css={css`
          ${flexrow}
          ${typo.sub.s}
          color: ${palette.text.primary};
        `}
      >
        <span>{companyName}</span>
        <span>{boothLocation}</span>
      </div>
      <div
        css={css`
          ${flexrow}
          ${typo.body.s}
          color: ${palette.text.secondary};
        `}
      >
        <span>{companyType}</span>
        <span>{boothNumber}</span>
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
