import { Dialog, DialogContent, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { css, useTheme } from '@mui/material';

interface UserInfoProps {
  open: boolean;
  onClose: () => void;
}

const UserInfo = ({ open, onClose }: UserInfoProps) => {
  const theme = useTheme();
  const { palette, typography } = theme;

  const dialogPaperStyle = css`
    min-width: 400px;
    min-height: 600px;
    border-radius: 16px;
    background-color: ${palette.background.tertiary};
    overflow: hidden;
  `;

  const headerStyle = css`
    position: relative;
    padding: 16px;
    border-bottom: 1px solid ${palette.divider};
    flex-shrink: 0;
    background-color: ${palette.background.tertiary}
  `;

  const titleStyle = css`
    font-family: ${typography.fontFamily};
    font-weight: bold;
    color: ${palette.text.primary};
  `;

  const closeIconStyle = css`
    position: absolute;
    top: 8px;
    right: 8px;
    color: ${palette.icon.primary}
  `;

  const contentStyle = css`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background-color: ${palette.background.tertiary}
  `;

  const sectionStyle = css`
    margin-bottom: 16px;
  `;

  const sectionTitleStyle = css`
    font-weight: bold;
    margin-bottom: 8px;
    color: ${palette.text.primary};
  `;

  const contentTextStyle = css`
    color: ${palette.text.secondary};
    line-height: 1.5;
  `;

  const userInfoData = [
    { title: '학력', content: '4년제 대학 졸업' },
    { title: '연령대', content: '20 ~ 24세 이하' },
    {
      title: '보유 기술',
      content:
        'Java, Spring Boot, MySQL, Docker, JPA, Github Actions, SonarQube, Redis, Junit5, Mockito, Git',
    },
    {
      title: '자기소개',
      content:
        '저는 최신 기술을 배우고 IT 업계에서 성장하기 위해 다양한 프로젝트에 참여하며 역량을 쌓아왔습니다. 데이터베이스 설계 경험이 있으며 협업과 문제 해결 능력을 갖추고 있습니다. 앞으로도 꾸준히 배우며 성장하겠습니다.',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        css: dialogPaperStyle,
      }}
    >
      <Box css={headerStyle}>
        <Typography css={titleStyle}>사용자 상세 정보</Typography>
        <IconButton onClick={onClose} css={closeIconStyle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent css={contentStyle}>
        {userInfoData.map((item, idx) => (
          <Box key={idx} css={sectionStyle}>
            <Typography css={sectionTitleStyle}>{item.title}</Typography>
            <Typography css={contentTextStyle}>{item.content}</Typography>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default UserInfo;
