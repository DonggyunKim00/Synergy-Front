import { Button, css, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const RankingModalOpenBtn = ({
  setModalOpen,
  visible,
}: {
  setModalOpen: () => void;
  visible: boolean;
}) => {
  const { palette, typo } = useTheme();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 10,
          }}
        >
          <Button
            css={css`
              ${typo.sub.s}
              background-color: ${palette.background.quaternary};
              color: ${palette.text.secondary};
              border: none;
              padding: 8px 16px;
              border-radius: 18px;
            `}
            onClick={setModalOpen}
          >
            더 보기
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RankingModalOpenBtn;
