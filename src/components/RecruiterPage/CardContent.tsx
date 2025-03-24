import { useState } from 'react';
import { css, Box, Typography, useTheme, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import defaultProfileImg from 'src/assets/default-profile-img.png';

const talentList = [
    {
        imageUrl: defaultProfileImg,
        name: '최영호',
        position: '프로덕트 디자이너',
        skills: 'Figma, Sketch, ...',
        experience: '5년 이상',
    },
    {
        imageUrl: '/images/profile2.png',
        name: '김지원',
        position: '백엔드 개발자',
        skills: 'Java, Spring Boot ...',
        experience: '2년 이하',
    },
    {
        imageUrl: '/images/profile3.png',
        name: '정서연',
        position: '프로덕트 디자이너',
        skills: 'Figma, Framer ...',
        experience: '2년 이하',
    },
    {
        imageUrl: '/images/profile4.png',
        name: '박시형',
        position: '프론트엔드 개발자',
        skills: 'JavaScript, TypeS ...',
        experience: '3~4년 이하',
    },
    {
        imageUrl: '/images/profile5.png',
        name: '이다영',
        position: '프론트엔드 개발자',
        skills: 'JavaScript, TypeS ...',
        experience: '3~4년 이하',
    },
    {
        imageUrl: '/images/profile6.png',
        name: '김다혜',
        position: '프론트엔드 개발자',
        skills: 'JavaScript, TypeS ...',
        experience: '5년 이상',
    },
];

interface CardContentItemProps {
    imageUrl: string;
    name: string;
    position: string;
    skills: string;
    experience: string;
    onBookmarkClick?: () => void;
    isBookmarked?: boolean;
}

const CardContentItem = ({
    imageUrl,
    name,
    position,
    skills,
    experience,
}: CardContentItemProps) => {
    const { palette } = useTheme();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };
    
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
            <IconButton onClick={handleBookmarkClick}>
            {isBookmarked ? (
                <FavoriteIcon sx={{ color: '#EB5050', fontSize: 20 }} />
            ) : (
                <FavoriteBorderIcon sx={{ color: palette.text.secondary, fontSize: 20 }} />
            )}
            </IconButton>
        </Box>
        </Box>
    );
};

const CardContent = () => {
    return (
        <Box
            css={css`
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
                justify-content: space-between;
            `}
        >
        {talentList.map((talent, index) => (
            <CardContentItem key={index} {...talent} />
        ))}
        </Box>
    );
};

export default CardContent;
