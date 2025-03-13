import { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { css, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ConferenceModal from './Modal/ConferenceModal';

const ConferenceRegistration = () => {
  const { palette, typography, radius } = useTheme();
  const [isConferenceRegistered, setIsConferenceRegistered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRegister = () => {
    handleOpen(); // 모달 열기
  };

  const handleModify = () => {
    if (isConferenceRegistered) {
      // TODO: 컨퍼런스 수정 로직
    }
  };

  const handleModalRegister = () => {
    setIsConferenceRegistered(true);
    handleClose();
  };

  const buttonStyle = css`
    color: ${palette.text.primary};
    border: 1px solid ${palette.border.primary};
    border-radius: ${radius.md}px;
    padding: 12px 14px;
    font-family: ${typography.fontFamily};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    flex: 1 0 0;
    background-color: ${palette.background.primary};
  `;

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap="16px"
      paddingTop="24px"
    >
      <Button
        variant="outlined"
        css={buttonStyle}
        onClick={handleRegister}
      >
        <AddIcon 
          css={css`
            font-size: 20px;
          `}
        />
        <Typography
          variant="body2"
          css={css`
            font-family: ${typography.fontFamily};
            font-weight: 500;
          `}
        >
          컨퍼런스 등록
        </Typography>
      </Button>
      <Button
        variant="outlined"
        css={css`
          ${buttonStyle}
          opacity: ${isConferenceRegistered ? 1 : 0.5};
          cursor: ${isConferenceRegistered ? 'pointer' : 'not-allowed'};
        `}
        onClick={handleModify}
      >
        <EditIcon 
          css={css`
            font-size: 20px;
          `}
        />
        <Typography
          variant="body2"
          css={css`
            font-family: ${typography.fontFamily};
            font-weight: 500;
          `}
        >
          컨퍼런스 수정
        </Typography>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus
      >
        <ConferenceModal onClose={handleClose} onRegister={handleModalRegister} />
      </Modal>
    </Box>
  );
};

export default ConferenceRegistration;