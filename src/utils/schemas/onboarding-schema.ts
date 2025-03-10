import { z } from 'zod';

// 관심 있는 분야 선택 (최소 1개 이상 필수)
export const InterestedSchema = z.object({
  interested_list: z.array(z.string()).min(1, '관심 있는 분야를 선택해주세요.'),
});

// 하고 있는 일 선택
export const WorkSchema = z.object({
  interested_list: InterestedSchema.shape.interested_list,
  work: z
    .object({
      parent: z.string().min(1, '직업을 선택해주세요.').default(''),
      child: z.string().min(1, '직무를 선택해주세요.').default(''),
      employeement_agree: z.enum(['yes', 'no']).nullable().default(null),
      private_agree: z.boolean().default(false),
    })
    .refine((data) => data.employeement_agree !== null, {
      message: '채용 희망 여부를 체크해주세요.',
      path: ['employeement_agree'],
    })
    .refine((data) => data.private_agree === true, {
      message: '개인 정보 수집 동의가 필요합니다.',
      path: ['private_agree'],
    }),
});

// 추가 정보 입력 (선택사항이지만, 입력하면 조건 충족해야 함)
export const MoreInfoSchema = z.object({
  interested_list: InterestedSchema.shape.interested_list,
  work: WorkSchema.shape.work,
  info: z.object({
    hope_job: z.string().min(1, '희망하는 직업을 선택해주세요.'),
    skills: z.string().min(1, '보유한 기술을 입력해주세요.'),
    experience: z.string().min(1, '경력을 입력해주세요.'),
    others_experience: z.string().optional(),
    cover_letter: z.string().min(10, '자기소개서를 10자 이상 입력해주세요.'),
    location: z.string().optional(),
    company: z.string().optional(),
    culture: z.string().optional(),
    purpose: z.string().optional(),
    salary: z.string().optional(),
  }),
});
