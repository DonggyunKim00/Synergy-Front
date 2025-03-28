import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { css, useTheme } from '@mui/material';
import {
  useRequestAuthCodeMutation,
  useConfirmAuthCodeMutation,
  useResetPasswordRequestMutation,
  useResetPasswordMutation
} from '@stores/server/auth';
import { signupSchema } from '@utils/schemas/signup-schema';
import ErrorPopover from '@components/ErrorPopover';

const passwordSchema = signupSchema.shape.password;

const ResetPassword = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typography, shape, spacing } = theme;

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [error, setFormError] = useState<string | null>(null);

  const requestAuthCodeMutation = useRequestAuthCodeMutation();
  const confirmAuthCodeMutation = useConfirmAuthCodeMutation();
  const resetPasswordRequestMutation = useResetPasswordRequestMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  useEffect(() => {
      if (timeLeft === null) return;
  
      if (timeLeft <= 0) {
        setTimeLeft(null);
        return;
      }
  
      const timerId = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
  
      return () => clearInterval(timerId);
    }, [timeLeft]);
  
    const formatTime = (seconds: number) => {
      const min = String(Math.floor(seconds / 60)).padStart(2, '0');
      const sec = String(seconds % 60).padStart(2, '0');
      return `${min}:${sec}`;
    };

  const handleAuthCodeRequest = async () => {
    requestAuthCodeMutation.mutate(email, {
      onSuccess: () => {
        setTimeLeft(300);
      },
    });
  };

  const handleAuthCodeConfirm = async () => {
    confirmAuthCodeMutation.mutate({ email, code: authCode });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
      setFormError(firstError);
      return;
    }
    resetPasswordMutation.mutateAsync({ email, newPassword });
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
    color: ${palette.text.primary};
    border-radius: 8px;
    background-color: ${palette.opacity.opa100};
    fieldset{
      border-color: ${palette.border.secondary};
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

  const flexRowStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${spacing(2)};
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
        <form onSubmit={(e) => e.preventDefault()} css={formStyle}>
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
          <Box css={flexRowStyle}>
            <TextField
              fullWidth
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              css={textFieldStyle}
              InputProps={{
                endAdornment: (
                  <Button onClick={handleAuthCodeRequest}
                    css={css`
                      background-color: ${palette.background.quaternary};
                      color: ${palette.text.primary};
                      border: none;
                      padding: 4px 10px;
                      font-size: 12px;
                      border-radius: 18px;
                      white-space: nowrap;
                      line-height: 1;
                      height: 32px;
                      margin-right: -8px;
                    `}
                  >
                    인증번호 요청
                  </Button>
                ),
              }}
            />
          </Box>

          <Typography variant="body1" css={labelStyle}>
            인증번호 입력
          </Typography>
          <Box css={flexRowStyle}>
            <TextField
              fullWidth
              placeholder={timeLeft !== null ? formatTime(timeLeft) : '인증번호를 입력해주세요.'}
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              required
              css={textFieldStyle}
              InputProps={{
                endAdornment: (
                  <Button onClick={handleAuthCodeConfirm}
                    css={css`
                      background-color: ${palette.background.quaternary};
                      color: ${palette.text.primary};
                      border: none;
                      padding: 4px 10px;
                      font-size: 12px;
                      border-radius: 18px;
                      white-space: nowrap;
                      line-height: 1;
                      height: 30px;
                      margin-right: -8px;
                    `}
                  >
                    확인
                  </Button>
                ),
              }}
            />
          </Box>

          <Typography variant="body1" css={labelStyle}>
            휴대폰 번호
          </Typography>
          <TextField
            fullWidth
            placeholder="- 없이 숫자만 입력해주세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            css={textFieldStyle}
          />

          <Button onClick={() => setStep(2)} css={buttonStyle}>
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
      <ErrorPopover error={error} />
    </Box>
  );
};

export default ResetPassword;
