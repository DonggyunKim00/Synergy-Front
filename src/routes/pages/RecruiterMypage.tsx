import { Box, Typography, useTheme, css } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import defaultProfileImg from 'src/assets/default-profile-img.png';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const talentList = [
  {
    imageUrl: defaultProfileImg,
    name: '김지원',
    position: '백엔드 개발자',
    skills: 'Java, Spring Boot ...',
    experience: '2년 이하',
  },
  {
    imageUrl: defaultProfileImg,
    name: '최영호',
    position: '프로덕트 디자이너',
    skills: 'Figma, Sketch ...',
    experience: '5년 이상',
  },
  {
    imageUrl: defaultProfileImg,
    name: '정서연',
    position: '프로덕트 디자이너',
    skills: 'Figma, Framer ...',
    experience: '2년 이하',
  },
  {
    imageUrl: defaultProfileImg,
    name: '박시형',
    position: '프론트엔드 개발자',
    skills: 'JavaScript, TypeS ...',
    experience: '3~4년 이하',
  },
  {
    imageUrl: defaultProfileImg,
    name: '이유진',
    position: '데이터 엔지니어',
    skills: 'Python, SQL, Airf ...',
    experience: '3년 이상',
  },
  {
    imageUrl: defaultProfileImg,
    name: '한지민',
    position: 'UX 리서처',
    skills: 'User Research, Pers ...',
    experience: '4년 이상',
  },
];

interface CardContentItemProps {
  imageUrl: string;
  name: string;
  position: string;
  skills: string;
  experience: string;
}

const CardContentItem = ({
  imageUrl,
  name,
  position,
  skills,
  experience,
}: CardContentItemProps) => {
  const { palette } = useTheme();
  
  return (
    <Box
      css={css`
        background-color: ${palette.background.tertiary};
        border-radius: 18px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1 0 0;
        min-width: 166px;
        max-width: 280px;
      `}
    >
      <Box
        css={css`
          width: 70px;
          height: 98px;
          overflow: hidden;
          margin-bottom: 12px;
        `}
      >
        <img
          src={imageUrl}
          alt={`${name} 프로필 이미지`}
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
        {name}
      </Typography>
      <Typography
        css={css`
          font-size: 14px;
          font-weight: 500;
          color: ${palette.text.primary};
          margin-bottom: 4px;
        `}
      >
        {position}
      </Typography>
      <Typography
        css={css`
          font-size: 12px;
          color: ${palette.text.primary};
          margin-bottom: 12px;
          line-height: 1.4;
        `}
      >
        {skills}
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
          {experience}
        </Typography>
        <FavoriteIcon sx={{ color: '#EB5050', fontSize: 20 }} />
      </Box>
    </Box>
  );
};

const RecruiterMypage = () => {
  const { palette, typo } = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      css={css`
        height: 100%;
        overflow-y: auto;
        border-radius: 0px 0px var(--radius-18, 18px) var(--radius-18, 18px);
        background-color: var(--opacity-opa100, rgba(67, 67, 67, 0.50));
        backdrop-filter: blur(5px);
      `}
    >
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          background-color: ${palette.background.tertiary};
          padding: 24px;
          height: 357px;
          border-bottom-left-radius: 18px;
          border-bottom-right-radius: 18px;
        `}
      >
        <Typography
          css={css`
            font-size: 20px;
            text-align: center;
            font-weight: 800;
            font-family: ${typo.fontFamily.Montserrat};
            color: ${palette.text.primary};
          `}
        >
          F'LINK 2025
        </Typography>
        <img
          src="/images/company-logo.png"
          alt="company logo"
          css={css`
            width: 100px;
            height: 100px;
            border-radius: 50%;
          `}
        />
        <Box textAlign="center">
          <Typography
            css={css`
              color: ${palette.text.primary};
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 4px;
            `}
          >
            박수진 님, 반갑습니다.
          </Typography>
          <Typography
            css={css`
              font-size: 14px;
              color: ${palette.text.secondary};
            `}
          >
            CodeSphere HR팀 매니저
          </Typography>
        </Box>
        <Box
          css={css`
            margin-top: 12px;
            padding: 6px 16px;
            background-color: ${palette.background.quaternary};
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
          `}
          onClick={() => navigate('/role-selection')}
        >
          <LogoutOutlinedIcon 
            css={css`
              width: 16px;
              height: 16px;
              color: ${palette.icon.tertiary}
              `}
            />
          <Typography
            css={css`
              font-size: 14px;
              font-weight: 500;
              color: ${palette.text.primary};
            `}
          >
            로그아웃
          </Typography>
        </Box>
      </Box>

      <Box
        css={css`
          background-color: ${palette.background.primary};
          padding: 20px;
          flex: 1;
        `}
      >
        <Box
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          `}
        >
          <Typography
            css={css`
              font-size: 16px;
              font-weight: 700;
              color: ${palette.text.primary};
            `}
          >
            내가 저장한 인재 ({talentList.length})
          </Typography>
          <ArrowForwardIosIcon
            css={css`
              font-size: 16px;
              cursor: pointer;
              color: ${palette.icon.primary};
            `}
            onClick={() => navigate('/recruiter/main')}
          />
        </Box>

        {talentList.length === 0 ? (
          <Typography
            css={css`
              color: ${palette.text.secondary};
              text-align: center;
              margin-top: 40px;
              font-size: 14px;
            `}
          >
            집계된 정보가 없습니다.
          </Typography>
        ) : (
          <Box
            css={css`
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              justify-content: flex-start;
            `}
          >
            {talentList.map((talent, index) => (
              <CardContentItem key={index} {...talent} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecruiterMypage;
