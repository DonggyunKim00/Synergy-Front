import { Box, Typography, Paper } from '@mui/material';
import { css, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const GradeRankingCard = () => {
    const { palette, typography, radius } = useTheme();
    return (
        <Box
            css={css`
                width: 100%;
                max-width: 300px;
                margin: 0 auto;
            `}
        >
            <Typography
                variant="subtitle1"
                css={css`
                    color: ${palette.text.primary};
                    font-family: ${typography.fontFamily};
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    text-align: left;
                `}
            >
                누적 포인트 랭킹
            </Typography>
            <Paper
                css={css`
                    background-color: ${palette.background.secondary};
                    border-radius: ${radius.sm}px;
                    padding: 16px;
                    text-align: center;
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                `}
            >
                <AddIcon 
                    css={css`
                        font-size: 40px;
                        color: ${palette.text.secondary};
                        margin-bottom: 16px;
                    `}
                />
                <Typography
                    variant="body2"
                    css={css`
                        color: ${palette.text.secondary};
                        font-family: ${typography.fontFamily};
                        font-size: 14px;
                        font-weight: 400;
                    `}
                >
                    컨퍼런스 등록 후 확인 가능합니다.
                </Typography>
            </Paper>
        </Box>
    );
};

export default GradeRankingCard;
