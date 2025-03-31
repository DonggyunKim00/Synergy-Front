import { z } from 'zod';

// 정규식 패턴
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // 24시간제 00:00 ~ 23:59

// 날짜 + 시간 기준으로 미래 여부 확인
const isFutureDateTime = (dateString: string, timeString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hour, minute] = timeString.split(':').map(Number);
  const sessionDate = new Date(year, month - 1, day, hour, minute);
  const now = new Date();
  return sessionDate > now;
};

// 세션 등록 스키마
export const sessionSchema = z
  .object({
    title: z
      .string()
      .min(1, '세션 제목을 입력해 주세요.')
      .max(30, '제목은 30자 이내로 입력해 주세요.'),
    presenter: z.string().min(1, '발표자 성함을 입력해 주세요.'),
    presenterRole: z
      .string()
      .min(1, '발표자의 직책을 입력해 주세요.')
      .max(30, '직책은 30자 이내로 입력해 주세요.'),
    date: z
      .string()
      .regex(dateRegex, '진행일은 YYYY-MM-DD 형식으로 입력해 주세요.'),
    startTime: z
      .string()
      .regex(timeRegex, '시작 시간은 24시간제 HH:MM 형식으로 입력해 주세요.'),
    endTime: z
      .string()
      .regex(timeRegex, '종료 시간은 24시간제 HH:MM 형식으로 입력해 주세요.'),
    sessionDescription: z
      .string()
      .min(1, '세션 설명을 입력해 주세요.')
      .max(200, '세션 설명은 200자 이내로 입력해 주세요.'),
    imageFile: z.any().optional(),
    maxCapacity: z.enum(['150', '200', '250'], {
      required_error: '최대 인원 수용을 선택해 주세요.',
    }),
  })
  .superRefine((data, ctx) => {
    const { date, startTime, endTime } = data;

    // 시작 시간이 현재보다 미래인지
    if (!isFutureDateTime(date, startTime)) {
      ctx.addIssue({
        path: ['date'],
        message: '진행일과 시작 시간은 현재 시각보다 이후여야 합니다.',
        code: z.ZodIssueCode.custom,
      });
    }

    // 시작 시간 < 종료 시간인지
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    if (start >= end) {
      ctx.addIssue({
        path: ['endTime'],
        message: '종료 시간은 시작 시간 이후여야 합니다.',
        code: z.ZodIssueCode.custom,
      });
    }
  });

// 부스 등록 스키마
export const boothSchema = z.object({
  companyName: z
    .string()
    .min(1, '기업 이름을 입력해 주세요.')
    .max(20, '기업 이름은 20자 이내로 입력해 주세요.'),
  companyType: z
    .string()
    .min(1, '기업 유형을 입력해 주세요.')
    .max(20, '기업 유형은 20자 이내로 입력해 주세요.'),
  boothLocation: z.string().min(1, '부스 장소를 선택해 주세요.'),
  boothNumber: z.string().min(1, '부스 번호를 입력해 주세요.'),
  boothDescription: z
    .string()
    .max(200, '부스 설명은 200자 이내로 입력해 주세요.'),
  imageFile: z.any().optional(),
});

// 컨퍼런스 등록 스키마
export const conferenceSchema = z
  .object({
    name: z
      .string()
      .max(30, { message: '컨퍼런스 명은 최대 30자까지 입력 가능합니다.' }),
    host: z
      .string()
      .max(10, { message: '컨퍼런스 주최자는 최대 10자까지 입력 가능합니다.' }),
    startDate: z.string().regex(dateRegex, {
      message: '시작일은 YYYY-MM-DD 형식으로 입력해 주세요.',
    }),
    startTime: z.string().regex(timeRegex, {
      message: '시작 시간은 24시간제로 00:00 형식으로 입력해 주세요.',
    }),
    endDate: z.string().regex(dateRegex, {
      message: '종료일은 YYYY-MM-DD 형식으로 입력해 주세요.',
    }),
    endTime: z.string().regex(timeRegex, {
      message: '종료 시간은 24시간제로 00:00 형식으로 입력해 주세요.',
    }),
    place: z
      .string()
      .max(30, { message: '컨퍼런스 장소는 최대 30자까지 입력 가능합니다.' }),
    location: z.enum(['그랜드볼룸', '아셈볼룸', 'THE PLATZ', '오리토리움'], {
      errorMap: () => ({ message: '컨퍼런스 위치를 선택해 주세요.' }),
    }),
    conferenceType: z.enum(['IT', '무역', '산업'], {
      errorMap: () => ({ message: '컨퍼런스 유형을 선택해 주세요.' }),
    }),
  })
  .superRefine((data, ctx) => {
    const { startDate, startTime, endDate, endTime } = data;

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const now = new Date();

    // 시작 시각이 현재보다 이후인지
    if (start <= now) {
      ctx.addIssue({
        path: ['startDate'],
        message: '시작일과 시작 시간은 현재 시각보다 이후여야 합니다.',
        code: z.ZodIssueCode.custom,
      });
    }

    // 종료 시각이 시작 시각보다 이후인지
    if (end <= start) {
      ctx.addIssue({
        path: ['endDate'],
        message: '종료일과 종료 시간은 시작일과 시작 시간 이후여야 합니다.',
        code: z.ZodIssueCode.custom,
      });
    }
  });
