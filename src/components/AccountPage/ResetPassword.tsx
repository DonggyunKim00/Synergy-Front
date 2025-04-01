import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
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
      const firstError = result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
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
    text-align: center;
    height: 100vh;
    overflow-y: auto;
    ::-webkit-scrollbar{
      display: none;  
    }
  `;

  const titleStyle = css`
    font-size: 74px;
    font-weight: 700;
    font-style: normal;
    font-height: normal;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Montserrat};
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

  const textFieldStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    margin-bottom: 16px;
    color: ${palette.text.primary};
    border-radius: 8px;
    background-color: ${palette.opacity.opa100};
    width: 100%
  `;

  const buttonStyle = css`
    width: 100%;
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    background-color: ${palette.background.quaternary};
    color: ${palette.text.primary};
    border-radius: ${shape.borderRadius}px;
  `;

  const labelStyle = css`
    margin-bottom: 8px;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Pretendard};
    font-weight: 500;
    text-align: left;
    font-size: 16px;
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
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" css={labelStyle}>
                이메일
              </Typography>
              <Box sx={{ display: 'flex', width: '100%' }}>
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
                          padding: var(--spacing-4, 4px) var(--spacing-15, 15px);
                          font-size: 12px;
                          border-radius: 18px;
                          white-space: nowrap;
                          margin-right: -8px;
                        `}
                      >
                        인증번호 요청
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" css={labelStyle}>
                인증번호 입력
              </Typography>
              <Box sx={{ display: 'flex', width: '100%' }}>
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
                          padding: var(--spacing-4, 4px) var(--spacing-10, 10px);
                          font-size: 12px;
                          border-radius: 18px;
                          white-space: nowrap;
                          margin-right: -8px;
                        `}
                      >
                        확인
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
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
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
