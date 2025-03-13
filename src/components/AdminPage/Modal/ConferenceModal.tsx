import { Box, TextField, Select, MenuItem, Button, Typography } from '@mui/material';
import { css, useTheme } from '@mui/material';

interface ConferenceModalProps {
    onClose: () => void;
    onRegister: () => void;
}

const InputField = ({ label, placeholder }: { label: string; placeholder: string }) => {
    const { palette } = useTheme();
    
    return (
        <>
            <Typography
                css={css`
                    color: ${palette.text.primary};
                    margin-bottom: 0;
                `}
            >
                {label}
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                placeholder={placeholder}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: palette.border.secondary,
                        },
                        '&:hover fieldset': {
                            borderColor: palette.border.secondary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: palette.border.secondary,
                        },
                    },
                }}
            />
        </>
    );
};

const ConferenceModal = ({ onClose, onRegister }: ConferenceModalProps) => {
    const { palette, typography, radius } = useTheme();

    const modalStyle = css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;
        max-height: 70vh;
        height: auto;
        background-color: ${palette.background.secondary};
        border-radius: ${radius.sm}px;
        box-shadow: 24px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
    `;

    return (
        <Box css={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2"
                css={css`
                    color: ${palette.text.primary};
                    font-family: ${typography.fontFamily};
                    font-weight: bold;
                    text-align: left;
                    margin-bottom: 10px;
                `}
            >
                컨퍼런스 등록
            </Typography>
            <InputField label="컨퍼런스 명" placeholder="컨퍼런스 명 입력" />
            <InputField label="컨퍼런스 주최자" placeholder="컨퍼런스 주최자 입력" />
            <InputField label="시작일" placeholder="시작일 입력" />
            <InputField label="시작 시간" placeholder="시작 시간 입력" />
            <InputField label="종료일" placeholder="종료일 입력" />
            <InputField label="종료 시간" placeholder="종료 시간 입력" />
            <InputField label="컨퍼런스 장소" placeholder="컨퍼런스 장소 입력" />
            <Typography css={css` color: ${palette.text.primary}; `}>컨퍼런스 위치 선택</Typography>
            <Select
                fullWidth
                margin="dense"
                defaultValue=""
                displayEmpty
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.border.secondary,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.border.secondary,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.border.secondary,
                    },
                    color: palette.text.quaternary,
                }}
            >
                <MenuItem value="" disabled>
                    선택
                </MenuItem>
            </Select>
            <Typography css={css` color: ${palette.text.primary}; `}>컨퍼런스 유형 선택</Typography>
            <Select
                fullWidth
                margin="dense"
                defaultValue=""
                displayEmpty
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.border.secondary,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.border.secondary,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.border.secondary,
                    },
                    color: palette.text.quaternary,
                }}
            >
                <MenuItem value="" disabled>
                    선택
                </MenuItem>
            </Select>
            <Button variant="contained" fullWidth
                css={css`
                    background-color: ${palette.background.primary};
                    color: ${palette.text.primary};
                    font-family: ${typography.fontFamily};
                    font-weight: bold;
                    padding: 12px;
                    border: none;
                    &:hover {
                        background-color: ${palette.background.tertiary};
                    }
                `}
                onClick={() => {
                    onRegister();
                    onClose();
                }}
            >
                등록하기
            </Button>
        </Box>
    );
};

export default ConferenceModal;
