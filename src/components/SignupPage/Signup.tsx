import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import { css, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorPopover from '@components/ErrorPopover';
import { useAuthSignupMutation, useRequestAuthCodeMutation, useConfirmAuthCodeMutation } from '@stores/server/auth';
import { signupSchema } from '@utils/schemas/signup-schema';

const Signup = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typo, shape, spacing } = theme;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [ticketCode, setTicketCode] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setFormError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const signupMutation = useAuthSignupMutation();
  const requestAuthCodeMutation = useRequestAuthCodeMutation();
  const confirmAuthCodeMutation = useConfirmAuthCodeMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = signupSchema.safeParse({
      name,
      email,
      authCode,
      ticketCode,
      password,
      phone,
      agreePersonalInfo,
      agreeTerms,
    });
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
      setFormError(firstError);
      return;
    }
    signupMutation.mutate({ name, email, password, phone });
  };

  const handleRequestAuthCode = () => { 
    requestAuthCodeMutation.mutate(email, {
      onSuccess: () => {
        setTimeLeft(300);
      },
    });
  };

  const handleConfirmAuthCode = () => { 
    confirmAuthCodeMutation.mutate({ email, code: authCode });
  };

  const textFieldStyle = css`
    margin-bottom: ${spacing(1)};
    color: ${palette.text.primary};
    border-radius: 8px;
    background-color: ${palette.opacity.opa100};
    fieldset{
      border-color: ${palette.border.secondary};
    }
  `;

  const labelStyle = css`
    margin-bottom: 8px;
    color: ${palette.text.primary};
    font-family: ${typo.fontFamily.Pretendard};
    font-weight: 500;
  `;

  const flexRowStyle = css`
    display: flex;
    gap: 8px;
    margin-bottom: ${spacing(1)};
  `;

  const buttonStyle = css`
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

  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        padding: ${spacing(1)};
        height: 100vh;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <Typography
        variant="h1"
        css={css`
          font-size: 74px;
          font-weight: bold;
          margin-bottom: ${spacing(1)};
          text-align: center;
          color: ${palette.text.primary};
          font-family: ${typo.fontFamily.Montserrat};
        `}
      >
        F'LINK
      </Typography>
      <Typography
        variant="h2"
        css={css`
          font-size: 26px;
          margin-bottom: ${spacing(3)};
          text-align: center;
          color: ${palette.text.primary};
          font-family: ${typo.fontFamily.Pretendard};
        `}
      >
        간편 회원가입
      </Typography>

      <Box component="form" onSubmit={handleSubmit} css={{ width: '100%' }}>
        <Typography variant="body1" css={labelStyle}>
          성함
        </Typography>
        <TextField
          fullWidth
          placeholder="성함을 입력해주세요."
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
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            css={textFieldStyle}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={handleRequestAuthCode}
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
                <Button
                onClick={handleConfirmAuthCode}
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

        <Typography
          css={css`
            color: ${palette.text.secondary};
            font-size: 12px;
            margin-bottom: ${spacing(2)};
            margin-top: 4px;
            color: ${palette.text.tertiary};
          `}
        >
          이메일로 발송된 인증번호를 입력해 주세요.
        </Typography>

        <Typography variant="body1" css={labelStyle}>
          F'LINK 티켓 코드 입력
        </Typography>
        <TextField
          fullWidth
          placeholder="티켓 코드를 입력해주세요."
          value={ticketCode}
          onChange={(e) => setTicketCode(e.target.value)}
          required
          css={textFieldStyle}
        />

        <Typography variant="body1" css={labelStyle}>
          비밀번호
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          css={textFieldStyle}
        />
        <Typography
          css={css`
            color: ${palette.text.secondary};
            font-size: 12px;
            margin-bottom: ${spacing(2)};
            margin-top: 4px;
            color: ${palette.text.tertiary};
          `}
        >
          비밀번호는 영문자와 숫자를 조합하여 8~20자 이내로 설정해 주세요.
        </Typography>

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

        <FormControlLabel
          control={
            <Checkbox
              checked={agreePersonalInfo}
              onChange={() => setAgreePersonalInfo(!agreePersonalInfo)}
              sx={{
                color: palette.icon.primary,
                '& .MuiSvgIcon-root': { fontSize: '20px' },
                '&.Mui-checked': {
                  color: palette.icon.primary,
                },
                '&:hover': { backgroundColor: 'transparent' },
              }}
              icon={<CheckCircleOutlineIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          }
          label="개인정보 수집에 동의합니다."
          css={css`
            color: ${palette.text.secondary};
            font-family: ${typo.fontFamily.Pretendard};
            padding-left: ${spacing(1)};
            padding-right: ${spacing(2)};
          `}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              sx={{
                color: palette.icon.primary,
                '& .MuiSvgIcon-root': { fontSize: '20px' },
                '&.Mui-checked': {
                  color: palette.icon.primary,
                },
                '&:hover': { backgroundColor: 'transparent' },
              }}
              icon={<CheckCircleOutlineIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          }
          label="이용 약관에 동의합니다."
          css={css`
            color: ${palette.text.secondary};
            font-family: ${typo.fontFamily.Pretendard};
            padding-left: ${spacing(1)};
            padding-right: ${spacing(2)};
          `}
        />
        <Button type="submit" variant="contained" fullWidth css={buttonStyle}>
          가입 완료
        </Button>
      </Box>
      <ErrorPopover error={error} />
    </Box>
  );
};

export default Signup;
