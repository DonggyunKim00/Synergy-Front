import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { css, useTheme } from '@mui/material';

const ResetPassword = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typography, shape, spacing } = theme;

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('비밀번호 재설정 요청:', { name, email, phone });
      // TODO: API 호출 로직
      setStep(2);
    } catch (error) {
      console.error('비밀번호 재설정 에러:', error);
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API 호출 로직
    } catch (error) {
      console.error('비밀번호 설정 에러:', error);
      alert('비밀번호 설정 중 오류가 발생했습니다.');
    }
  };

  const containerStyle = css`
    width: 300px;
    margin: 20px auto;
    text-align: center;
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: bold;
    margin-bottom: ${spacing(1)};
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
  `;

  const subtitleStyle = css`
    font-size: 26px;
    margin-bottom: ${spacing(3)};
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
  `;

  const formStyle = css`
    width: 100%;
  `;

  const textFieldStyle = css`
    margin-bottom: ${spacing(2)};
    .MuiOutlinedInput-root {
      color: ${palette.text.primary};
      border-radius: ${shape.borderRadius}px;
      fieldset {
        border-color: ${palette.divider_custom.primary};
      }
      &:hover fieldset {
        border-color: ${palette.divider_custom.secondary};
      }
      &.Mui-focused fieldset {
        border-color: ${palette.primary.main};
      }
    }
  `;

  const buttonStyle = css`
    width: 100%;
    margin-top: ${spacing(2)};
    padding: ${spacing(1.5)};
    font-size: 16px;
    font-weight: bold;
    border: none;
    background-color: ${palette.background.quaternary};
    color: ${palette.text.primary};
    border-radius: ${shape.borderRadius}px;
    &:hover {
      background-color: ${palette.background.tertiary};
    }
  `;

  const labelStyle = css`
    margin-bottom: 8px;
    color: ${palette.text.primary};
    font-family: ${typography.fontFamily};
    font-weight: 500;
    text-align: left;
  `;

  return (
    <Box css={containerStyle}>
      <Typography variant="h1" css={titleStyle}>
        F'LINK
      </Typography>
      <Typography variant="h2" css={subtitleStyle}>
        비밀번호 재설정
      </Typography>
      {step === 1 ? (
        <form onSubmit={handleSubmit} css={formStyle}>
          <Typography variant="body1" css={labelStyle}>
            성함
          </Typography>
          <TextField
            fullWidth
            placeholder="성함을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            css={textFieldStyle}
          />

          <Typography variant="body1" css={labelStyle}>
            이메일
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            css={textFieldStyle}
          />

          <Typography variant="body1" css={labelStyle}>
            휴대폰 번호
          </Typography>
          <TextField
            fullWidth
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            css={textFieldStyle}
          />

          <Button type="submit" css={buttonStyle}>
            확인
          </Button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} css={formStyle}>
          <Typography variant="body1" css={labelStyle}>
            새 비밀번호
          </Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="새로운 비밀번호 입력"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            css={textFieldStyle}
          />
          <Typography
            variant="body2"
            css={css`
              font-size: 14px;
              color: ${palette.text.secondary};
              margin-bottom: ${spacing(2)};
              text-align: left;
            `}
          >
            비밀번호는 영문자와 숫자를 조합하여 8-20자 이내로 설정합니다.
          </Typography>
          <Button type="submit" css={buttonStyle}>
            확인
          </Button>
        </form>
      )}
    </Box>
  );
};

export default ResetPassword;
