export const checkboxItems = [
  { id: 'ai', label: 'AI' },
  { id: 'machine-learning', label: '머신러닝' },
  { id: 'design', label: '디자인' },
  { id: 'big-data', label: '빅데이터' },
  { id: 'frontend', label: '프론트엔드 개발' },
  { id: 'backend', label: '백엔드 개발' },
  { id: 'cloud', label: '클라우드 기술' },
];

export const jobs = [
  {
    value: 'developer',
    text: '개발자',
    children: [
      { value: 'frontend', text: '프론트엔드 개발자' },
      { value: 'backend', text: '백엔드 개발자' },
      { value: 'fullstack', text: '풀스택 개발자' },
      { value: 'devops', text: '데브옵스 엔지니어' },
    ],
  },
  {
    value: 'designer',
    text: '디자이너',
    children: [
      { value: 'uiux', text: 'UI/UX 디자이너' },
      { value: 'graphic', text: '그래픽 디자이너' },
      { value: 'motion', text: '모션 그래픽 디자이너' },
    ],
  },
  {
    value: 'pm',
    text: 'PM',
    children: [
      { value: 'product', text: '프로덕트 매니저' },
      { value: 'project', text: '프로젝트 매니저' },
    ],
  },
  {
    value: 'marketer',
    text: '마케터',
    children: [
      { value: 'digital', text: '디지털 마케터' },
      { value: 'brand', text: '브랜드 마케터' },
    ],
  },
];

// 희망 직무 리스트
export const hope_job = jobs.flatMap((job) => job.children);

// 경력 선택
export const experience_range = [
  { value: 'entry', text: '신입' },
  { value: '1-3', text: '1~3년차' },
  { value: '3-5', text: '3~5년차' },
  { value: '5-7', text: '5~7년차' },
  { value: '7-10', text: '7~10년차' },
  { value: '10+', text: '10년차 이상' },
];

// 희망 연봉 선택
export const salary_range = [
  { value: '3000-5000', text: '3000~5000 만원' },
  { value: '5000-7000', text: '5000~7000 만원' },
  { value: '7000-10000', text: '7000~10000 만원' },
  { value: '10000+', text: '10000 만원 이상' },
];

// 희망 회사 규모
export const company_type = [
  { value: 'startup', text: '스타트업' },
  { value: 'sme', text: '중소기업' },
  { value: 'mid', text: '중견기업' },
  { value: 'enterprise', text: '대기업' },
];

// 선호 기업 문화
export const company_culture = [
  { value: 'horizontal', text: '수평적인 조직 문화' },
  { value: 'growth', text: '개인의 성장을 중시' },
  { value: 'teamwork', text: '팀워크를 중시' },
  { value: 'flexible', text: '유연한 근무 환경' },
];

// 컨퍼런스 참여 목적
export const conference_purpose = [
  { value: 'networking', text: '네트워킹' },
  { value: 'learning', text: '최신 기술 트렌드 학습' },
  { value: 'career', text: '커리어 기회 탐색' },
  { value: 'project', text: '프로젝트 아이디어 구상' },
];
