import { css, styled, useTheme } from '@mui/material';
import { BoothContent } from '@routes/pages/BoothPage';
import { useNavigate } from 'react-router-dom';
import DefaultImage from '@assets/defaultImg_boothsession.png';

const BoothColumn = ({
  id,
  companyName,
  companyType,
  detailLocation,
  location,
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
      <StyledImage src={image || DefaultImage} />
      <div
        css={css`
          ${flexrow}
          ${typo.sub.s}
          color: ${palette.text.primary};
        `}
      >
        <span>{companyName}</span>
        <span>{location}</span>
      </div>
      <div
        css={css`
          ${flexrow}
          ${typo.body.s}
          color: ${palette.text.secondary};
        `}
      >
        <span>{companyType}</span>
        <span>{detailLocation}</span>
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
