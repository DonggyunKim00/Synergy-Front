import { z } from 'zod';

// 정규식 패턴
const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/; // YYYY.MM.DD
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // 24시간제 00:00 ~ 23:59

const isFutureDate = (dateString: string) => {
  const date = new Date(dateString.replace(/\./g, '-'));
  const now = new Date();
  return date > now;
};

// 세션 등록 스키마
export const sessionSchema = z.object({
    title: z.string().min(1, '세션 제목을 입력해 주세요.').max(30, '제목은 30자 이내로 입력해 주세요.'),
    presenter: z.string().min(1, '발표자 성함을 입력해 주세요.'),
    presenterRole: z.string().min(1, '발표자의 직책을 입력해 주세요.').max(15, '직책은 15자 이내로 입력해 주세요.'),
    date: z.string()
      .regex(dateRegex, '진행일은 YYYY.MM.DD 형식으로 입력해 주세요.')
      .refine(isFutureDate, '진행일은 미래 날짜여야 합니다.'),
    startTime: z.string().regex(timeRegex, '시작 시간은 24시간제 HH:MM 형식으로 입력해 주세요.'),
    endTime: z.string().regex(timeRegex, '종료 시간은 24시간제 HH:MM 형식으로 입력해 주세요.'),
    sessionDescription: z.string().min(1, '세션 설명을 입력해 주세요.').max(150, '세션 설명은 150자 이내로 입력해 주세요.'),
    imageFile: z.any().optional(),
    maxCapacity: z.enum(['150', '200', '250'], { required_error: '최대 인원 수용을 선택해 주세요.' }),
  });

//  부스 등록 스키마
export const boothSchema = z.object({
    companyName: z.string().min(1, '기업 이름을 입력해 주세요.').max(10, '기업 이름은 10자 이내로 입력해 주세요.'),
    companyType: z.string().min(1, '기업 유형을 입력해 주세요.').max(10, '기업 유형은 10자 이내로 입력해 주세요.'),
    boothLocation: z.string().min(1, '부스 장소를 선택해 주세요.'),
    boothNumber: z.string().min(1, '부스 번호를 입력해 주세요.'),
    boothDescription: z.string().max(150, '부스 설명은 150자 이내로 입력해 주세요.'),
    imageFile: z.instanceof(File).optional().or(z.null()),
  });

  export const conferenceSchema = z.object({
    name: z.string().max(30, { message: '컨퍼런스 명은 최대 30자까지 입력 가능합니다.' }),
    host: z.string().max(10, { message: '컨퍼런스 주최자는 최대 10자까지 입력 가능합니다.' }),
    startDate: z.string()
      .regex(dateRegex, { message: '시작일은 YYYY.MM.DD 형식으로 입력해 주세요.' })
      .refine(isFutureDate, { message: '시작일은 오늘 이후의 날짜만 입력 가능합니다.' }),
    startTime: z.string()
      .regex(timeRegex, { message: '시작 시간은 24시간제로 00:00 형식으로 입력해 주세요.' }),
    endDate: z.string()
      .regex(dateRegex, { message: '종료일은 YYYY.MM.DD 형식으로 입력해 주세요.' })
      .refine(isFutureDate, { message: '종료일은 오늘 이후의 날짜만 입력 가능합니다.' }),
    endTime: z.string()
      .regex(timeRegex, { message: '종료 시간은 24시간제로 00:00 형식으로 입력해 주세요.' }),
    location: z.enum(['그랜드볼룸', '아셈볼룸', 'THE PLATZ', '오리토리움'], {
      errorMap: () => ({ message: '컨퍼런스 위치를 선택해 주세요.' }),
    }),
    conferenceType: z.enum(['IT', '무역', '산업'], {
      errorMap: () => ({ message: '컨퍼런스 유형을 선택해 주세요.' }),
    }),
  });