import { Dialog, styled } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const AnimatedModal = ({ open, onClose, children }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          boxShadow: 'none',
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        },
      }}
    >
      <MotionWrapper
        initial={{ x: '-50%', y: '100%' }}
        animate={open ? 'visible' : 'hidden'}
        exit="exit"
        variants={modalVariants}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <CloseBtn />
        </div>
        {children}
      </MotionWrapper>
    </Dialog>
  );
};

const MotionWrapper = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  backgroundColor: theme.palette.background.tertiary,
  borderTopLeftRadius: '18px',
  borderTopRightRadius: '18px',
  width: '100%',
  maxWidth: '600px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '65%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const CloseBtn = styled(CloseIcon)(({ theme }) => ({
  color: theme.palette.icon.primary,
}));

export default AnimatedModal;
