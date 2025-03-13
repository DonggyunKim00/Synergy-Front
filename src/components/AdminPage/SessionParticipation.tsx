import { Box, Typography, Paper } from '@mui/material';
import { css, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SessionParticipation = () => {
    const { palette, typography, radius } = useTheme();
    return (
        <Box>
            <Typography 
                variant="subtitle1" 
                fontWeight="bold" 
                mb={1}
                css={css`
                    color: ${palette.text.primary};
                    font-family: ${typography.fontFamily};
                `}
            >
                세션 참여 현황
            </Typography>
            <Paper
                css={css`
                    text-align: center;
                    color: ${palette.text.secondary};
                    border-radius: ${radius.sm}px;
                    background-color: ${palette.background.inverse};
                    padding: 50px;
                    border: ${palette.divider_custom.primary};
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
                    `}
                >
                    등록된 세션이 없습니다.
                </Typography>
                <Typography 
                    variant="body2"
                    css={css`
                        color: ${palette.text.secondary};
                        font-family: ${typography.fontFamily};
                    `}
                >
                    컨퍼런스 등록 후 확인 가능합니다.
                </Typography>
            </Paper>
        </Box>
    );
};

export default SessionParticipation;
