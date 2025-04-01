import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
} from '@mui/material';
import { css, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorPopover from '@components/ErrorPopover';
import {
  useAuthSignupMutation,
  useRequestAuthCodeMutation,
  useConfirmAuthCodeMutation,
} from '@stores/server/auth';
import { signupSchema } from '@utils/schemas/signup-schema';
import InputBox from '@components/InputBox';

const Signup = (): React.JSX.Element => {
  const theme = useTheme();
  const { palette, typo, shape, spacing, breakpoints } = theme;

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
      const firstError =
        result.error.errors[0]?.message || '입력값을 다시 확인해 주세요.';
      setFormError(firstError);
      return;
    }
    signupMutation.mutate({ name, email, ticketCode, password, phone });
  };

  const handleRequestAuthCode = () => {
    requestAuthCodeMutation.mutate(email, {
      onSuccess: () => {
        setTimeLeft(300);
      },
    });
  };

  const handleConfirmAuthCode = async () => {
    try {
      const response = await confirmAuthCodeMutation.mutate({
        email,
        code: authCode,
        purpose: 'SIGNUP',
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const flexRowStyle = css`
    display: flex;
    flex-direction: column;
  `;

  const buttonStyle = css`
    margin-top: ${spacing(2)};
    padding: ${spacing(1.5)};
    font-size: 16px;
    font-weight: bold;
    border: none;
    background-color: ${palette.background.quaternary};
    color: ${palette.text.primary};
    border-radius: 12px;
    &:hover {
      background-color: ${palette.background.tertiary};
    }
  `;

  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 16px;
        height: 100vh;
        padding-bottom: 90px;
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

      <Box
        component="form"
        onSubmit={handleSubmit}
        css={{
          width: '100%',
        }}
      >
        <InputBox
          id="name"
          label="성함"
          placeholder="성함을 입력해주세요."
          value={name}
          onChange={setName}
          bgColor={palette.opacity.opa100}
          fullWidth
          padding="16px"
          margin="0px 0px 16px"
        />

        <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>
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
            margin="0px 0px 16px"
          />
          <Button
            onClick={handleRequestAuthCode}
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

        <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>
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
            onClick={handleConfirmAuthCode}
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

        <InputBox
          id="ticketCode"
          label="F'LINK 티켓 코드 입력"
          fullWidth
          placeholder="티켓 코드를 입력해주세요."
          value={ticketCode}
          onChange={setTicketCode}
          bgColor={palette.opacity.opa100}
          padding="16px"
          margin="0px 0px 16px"
        />

        <InputBox
          id="password"
          label="비밀번호"
          type="password"
          fullWidth
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={setPassword}
          bgColor={palette.opacity.opa100}
          padding="16px"
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

        <InputBox
          id="phoneNumber"
          label="휴대폰 번호"
          fullWidth
          placeholder="- 없이 숫자만 입력해주세요"
          value={phone}
          onChange={setPhone}
          bgColor={palette.opacity.opa100}
          padding="16px"
          margin="0px 0px 16px"
        />

        <Box css={flexRowStyle}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreePersonalInfo}
                onChange={() => setAgreePersonalInfo(!agreePersonalInfo)}
                sx={{
                  color: palette.icon.primary,
                  '& .MuiSvgIcon-root': { fontSize: 16 },
                  '&.Mui-checked': {
                    color: palette.icon.primary,
                  },
                  fontSize: '20px',
                }}
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
            }
            label="개인정보 수집에 동의합니다."
            css={css`
              ${typo.body.m}
              color: ${palette.text.secondary};
            `}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                sx={{
                  color: palette.icon.primary,
                  '& .MuiSvgIcon-root': { fontSize: 16 },
                  '&.Mui-checked': {
                    color: palette.icon.primary,
                  },
                  fontSize: '20px',
                }}
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
            }
            label="이용 약관에 동의합니다."
            css={css`
              ${typo.body.m}
              color: ${palette.text.secondary};
            `}
          />
        </Box>

        <Button type="submit" variant="contained" fullWidth css={buttonStyle}>
          가입 완료
        </Button>
      </Box>
      <ErrorPopover error={error} />
    </Box>
  );
};

export default Signup;
