import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { css, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddBooth from './Popup/AddBooth';
import { useConferenceStore } from '@stores/client/useConferenceStore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { useBoothStore } from '@stores/client/UseBoothStore';

const BoothParticipation = () => {
    const { palette, typography, radius } = useTheme();
    const isConferenceRegistered = useConferenceStore((state) => state.isConferenceRegistered);
    const { isBoothRegistered, hasAggregationData } = useBoothStore();
    const [showAddBooth, setShowAddBooth] = useState(false);
    const navigate = useNavigate();

    const handleAddIconClick = () => {
        if (isConferenceRegistered) {
            setShowAddBooth(true);
        } else {
            alert('컨퍼런스를 등록해주세요');
        }
    };

    const handleChevronClick = () => {
        if (isConferenceRegistered) {
            navigate('/admin/booth');
        } else {
            alert('컨퍼런스를 등록해주세요');
        }
    };

    return (
        <Box position="relative">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography 
                    variant="subtitle1" 
                    fontWeight="bold"
                    css={css`
                        color: ${palette.text.primary};
                        font-family: ${typography.fontFamily};
                    `}
                >
                    부스 참여 현황
                </Typography>
                <ChevronRightIcon 
                    css={css`
                        color: ${palette.icon.primary};
                        cursor: pointer;
                    `}
                    onClick={handleChevronClick}
                />
            </Box>

            {!isConferenceRegistered ? (
                <Paper
                    css={css`
                        text-align: center;
                        color: ${palette.text.secondary};
                        border-radius: ${radius.sm}px;
                        background-color: ${palette.background.secondary};
                        padding: 50px;
                        border: ${palette.divider_custom.primary};
                        cursor: pointer;
                    `}
                    onClick={handleAddIconClick}
                >
                    <AddIcon 
                        css={css`
                            font-size: 40px;
                            color: ${palette.text.secondary};
                            margin-bottom: 16px;
                        `}
                    />
                    <Typography variant="body2">등록된 부스가 없습니다.</Typography>
                    <Typography variant="body2">컨퍼런스 등록 후 확인 가능합니다.</Typography>
                </Paper>
            ) : !isBoothRegistered ? (
                <Paper
                    css={css`
                        text-align: center;
                        color: ${palette.text.secondary};
                        border-radius: ${radius.sm}px;
                        background-color: ${palette.background.secondary};
                        padding: 50px;
                        border: ${palette.divider_custom.primary};
                        cursor: pointer;
                    `}
                    onClick={handleAddIconClick}
                >
                    <AddIcon 
                        css={css`
                            font-size: 40px;
                            color: ${palette.text.secondary};
                            margin-bottom: 16px;
                        `}
                    />
                    <Typography variant="body2">등록된 부스가 없습니다.</Typography>
                    <Typography variant="body2">부스 등록 후 확인 가능합니다.</Typography>
                </Paper>
            ) : !hasAggregationData ? (
                <Paper
                    css={css`
                        text-align: center;
                        color: ${palette.text.secondary};
                        border-radius: ${radius.sm}px;
                        background-color: ${palette.background.secondary};
                        padding: 50px;
                        border: ${palette.divider_custom.primary};
                    `}
                >
                    <Typography variant="body2" mb={1}>
                        집계된 정보가 없습니다.
                    </Typography>
                </Paper>
            ) : (
                <Typography>집계된 부스 정보 표시</Typography>
            )}

            {showAddBooth && (
                <AddBooth
                    open={showAddBooth}
                    onClose={() => setShowAddBooth(false)}
                />
            )}
        </Box>
    );
};

export default BoothParticipation;
