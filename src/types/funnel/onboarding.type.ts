export type Jobs = {
  parent: string;
  child: string;
  employeement_agree: 'yes' | 'no' | null;
  private_agree: boolean;
};

export type Infos = {
  // 필수 속성
  hope_job_group: string;
  hope_job_position: string;
  education: string;
  age: string;
  skills: string;
  experience: string;
  hope_location: string[];
  cover_letter: string;
  // 선택 속성
  profile_img?: File | null;
  others_experience?: string;
  company?: string[];
  culture?: string[];
  purpose?: string[];
};

// 1. 아무것도 입력 안됨
export type SelectInterested = {
  interested_list?: string[];
};

// 2. 관심있는 분야만 선택됨
export type SelectWork = {
  interested_list: string[];
  work?: Jobs;
};

// 3. 관심있는 분야, 하고있는 일 선택됨
export type MoreInfo = {
  interested_list: string[];
  work: Jobs;
  info?: Infos;
};
