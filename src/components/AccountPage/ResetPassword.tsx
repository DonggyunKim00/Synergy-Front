import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { css, useTheme } from '@mui/material';
import {
  useRequestAuthCodeMutation,
  useConfirmAuthCodeMutation,
  useResetPasswordRequestMutation,
  useResetPasswordMutation,
} from '@stores/server/auth';
import { signupSchema } from '@utils/schemas/signup-schema';
import ErrorPopover from '@components/ErrorPopover';
import InputBox from '@components/InputBox';

const passwordSchema = signupSchema.shape.password;

const ResetPassword = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typo, shape, spacing, breakpoints } = theme;

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
    try {
      const response = await confirmAuthCodeMutation.mutate({
        email,
        code: authCode,
        purpose: 'PASSWORD_RESET',
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      const firstError =
        result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
      setFormError(firstError);
      return;
    }
    resetPasswordMutation.mutateAsync({ email, newPassword });
  };

  const containerStyle = css`
    display: flex;
    min-width: 375px;
    max-width: 600px;
    padding: 16px;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: 700;
    font-style: normal;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Montserrat};
    text-align: center;
  `;

  const subtitleStyle = css`
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    font-style: normal;
    line-height: normal;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Pretendard};
    margin-bottom: 30px;
  `;

  const buttonStyle = css`
    width: 100%;
    padding: 16px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    background-color: ${palette.background.quaternary};
    color: ${palette.text.primary};
    border-radius: ${shape.borderRadius};
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
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container sx={{ width: '100%' }}>
            <Grid
              item
              xs={12}
              css={css`
                margin-bottom: 16px;
              `}
            >
              <InputBox
                id="name"
                label="성함"
                fullWidth
                placeholder="성함을 입력하세요."
                value={name}
                onChange={setName}
                bgColor={palette.opacity.opa100}
                padding="16px"
              />
            </Grid>

            <Grid
              item
              xs={12}
              css={css`
                margin-bottom: 16px;
              `}
            >
              <Box
                sx={{ display: 'flex', width: '100%', position: 'relative' }}
              >
                <InputBox
                  id="email"
                  label="이메일"
                  fullWidth
                  placeholder="example@email.com"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  bgColor={palette.opacity.opa100}
                  padding="16px"
                />
                <Button
                  onClick={handleAuthCodeRequest}
                  css={css`
                    position: absolute;
                    right: 16px;
                    top: 41px;
                    background-color: ${palette.background.quaternary};
                    color: ${palette.text.primary};
                    border: none;
                    padding: var(--spacing-4, 4px) var(--spacing-15, 15px);
                    font-size: 12px;
                    border-radius: 18px;
                    white-space: nowrap;
                  `}
                >
                  인증번호 요청
                </Button>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              css={css`
                margin-bottom: 16px;
              `}
            >
              <Box
                sx={{ display: 'flex', width: '100%', position: 'relative' }}
              >
                <InputBox
                  id="otp"
                  label="인증번호 입력"
                  fullWidth
                  placeholder={
                    timeLeft !== null
                      ? formatTime(timeLeft)
                      : '인증번호를 입력해주세요.'
                  }
                  value={authCode}
                  onChange={setAuthCode}
                  bgColor={palette.opacity.opa100}
                  padding="16px"
                />
                <Button
                  onClick={handleAuthCodeConfirm}
                  css={css`
                    position: absolute;
                    right: 16px;
                    top: 41px;
                    background-color: ${palette.background.quaternary};
                    color: ${palette.text.primary};
                    border: none;
                    padding: var(--spacing-4, 4px) var(--spacing-10, 10px);
                    font-size: 12px;
                    border-radius: 18px;
                    white-space: nowrap;
                    margin-right: -8px;
                  `}
                >
                  확인
                </Button>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              css={css`
                margin-bottom: 30px;
              `}
            >
              <InputBox
                id="phoneNumber"
                label="휴대폰 번호"
                fullWidth
                placeholder="- 없이 숫자만 입력해주세요"
                value={phone}
                onChange={setPhone}
                bgColor={palette.opacity.opa100}
                padding="16px"
              />
            </Grid>

            <Grid item xs={12}>
              <Button onClick={() => {
                  if (!confirmAuthCodeMutation.isSuccess) {
                    setFormError('이메일 인증을 완료해주세요.');
                    return;
                  }
                  setStep(2);
                }}
                css={buttonStyle}
              >
                확인
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <InputBox
                  id="newPassword"
                  label="새 비밀번호"
                  fullWidth
                  placeholder="새로운 비밀번호를 입력해 주세요."
                  value={newPassword}
                  onChange={setNewPassword}
                  bgColor={palette.opacity.opa100}
                  padding="16px"
                  type="password"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
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
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
      <ErrorPopover error={error} />
    </Box>
  );
};

export default ResetPassword;
