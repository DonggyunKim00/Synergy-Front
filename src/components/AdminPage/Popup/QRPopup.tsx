import { Dialog, DialogContent, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { css, useTheme } from '@mui/material';

interface QRPopupProps {
    open: boolean;
    onClose: () => void;
    qrCodeLabel: string; // QR 코드 아래 1
    description: string; // QR 코드 아래 2
}

const QRPopup = ({ open, onClose, qrCodeLabel, description }: QRPopupProps) => {
    const { palette, typography } = useTheme();

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="xs" 
            fullWidth
            PaperProps={{
                sx: {
                    maxWidth: 400,
                    borderRadius: 4,
                    backgroundColor: palette.background.tertiary,
                    position: 'relative',
                },
            }}
        >
            <IconButton 
                onClick={onClose} 
                sx={{
                    position: 'absolute', 
                    top: 8,
                    right: 8,
                    color: palette.icon.primary,
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box //qr 자리 확인을 위한 박스
                        width={150}
                        height={150}
                        css={css`
                            border: 1px solid ${palette.divider};
                        `}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {/* QR 이미지 자리 */}
                        <Box
                            width={150}
                            height={150}
                            css={css`
                                background-color: ${palette.divider};
                            `}
                        />
                    </Box>
                    <Typography 
                        mt={2} 
                        fontWeight="bold" 
                        css={css`
                            font-family: ${typography.fontFamily};
                            color: ${palette.text.primary};
                        `}
                    >
                        {qrCodeLabel}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        css={css`
                            color: ${palette.text.secondary};
                            font-family: ${typography.fontFamily};
                        `}
                    >
                        {description}
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default QRPopup;
