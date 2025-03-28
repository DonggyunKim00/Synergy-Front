import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  authCode: z.string().min(1, '인증번호를 입력해주세요.'),
  ticketCode: z.string().min(1, '티켓 코드를 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 숫자와 영문자가 조합되어야 합니다.'),
  phone: z
    .string()
    .length(11, '휴대폰 번호는 정확히 11자리여야 합니다.')
    .regex(/^\d{11}$/, '휴대폰 번호는 숫자만 입력해주세요.'),
  agreePersonalInfo: z.boolean().refine(val => val === true, '개인정보 수집에 동의해주세요.'),
  agreeTerms: z.boolean().refine(val => val === true, '이용 약관에 동의해주세요.')
});

export const NewpasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 숫자와 영문자가 조합되어야 합니다.'),
});