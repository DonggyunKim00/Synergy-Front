import Dialog from '@mui/material/Dialog';
import { Button, css, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useAttendeeProfile } from '@stores/server/attendee';

export interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  earnPoint: number;
}

const SuccessPopup = ({ open, onClose, title, earnPoint }: Props) => {
  const { typo, palette, radius } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/mypage');
    onClose();
  };

  const {
    data: { data: userProfile },
  } = useAttendeeProfile();

  const styles = {
    dialogPaper: css`
      min-width: 314px;
      min-height: 340px;
      display: flex;
      flex-direction: column;
      padding: 24px;
      border-radius: ${radius.xl};
      background-color: ${palette.background.tertiary};
    `,
    closeButton: css`
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
    `,
    icon: css`
      width: 100px;
      height: 100px;
      color: ${palette.icon.quaternary};
      margin-bottom: 18px;
    `,
    textContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    buttonGroup: css`
      display: flex;
      gap: 12px;
      margin-top: 20px;
    `,
    button: css`
      background-color: ${palette.background.quinary};
      border: none;
      padding: 15.5px 20px;
      ${typo.sub.s}
      color: ${palette.text.primary};
    `,
    highlight: css`
      color: ${palette.text.secondary};
    `,
    subText: css`
      ${typo.sub.xs}
      color: ${palette.text.quaternary};
    `,
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ '.MuiDialog-paper': styles.dialogPaper }}
    >
      {/* 닫기 버튼 */}
      <div css={styles.closeButton} onClick={onClose}>
        <CloseIcon css={{ color: palette.icon.primary }} />
      </div>

      {/* 내용 */}
      <div css={styles.textContainer}>
        <CheckCircleIcon fontSize="inherit" css={styles.icon} />
        <Typography
          variant="h3"
          css={{ ...typo.title.xs, color: palette.text.primary }}
        >
          {title}
        </Typography>
        <span
          css={{
            ...typo.sub.l,
            color: palette.text.secondary,
            margin: '6px 0px 10px',
          }}
        >
          <b css={{ color: palette.text.primary }}>{earnPoint}P</b> 적립완료
        </span>
        <span css={styles.subText}>
          총 포인트 <b css={styles.highlight}>{userProfile.totalPoints}P</b>
        </span>
        <span css={styles.subText}>
          <b css={styles.highlight}>
            {userProfile.nextPointResponseDto.needPoint}P
          </b>{' '}
          더 모으면{' '}
          <b css={styles.highlight}>
            {userProfile.nextPointResponseDto.nextMembershipLevel}
          </b>
        </span>

        {/* 버튼 */}
        <div css={styles.buttonGroup}>
          <Button css={styles.button} onClick={handleNavigate}>
            내 포인트 확인하기
          </Button>
          <Button css={styles.button} onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default SuccessPopup;
