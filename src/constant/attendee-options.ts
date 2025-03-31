import { JOB_POSITIONS } from './onboarding-lookups';
import {REGION_TYPE, AGE_GROUPS, EXPERIENCE_LEVEL_TYPE, EDUCATION_LEVELS} from './onboarding-codes';

export const jobOptions = JOB_POSITIONS.map((job) => job.name);
export const regionOptions = REGION_TYPE.map((region) => region.name);
export const ageOptions = AGE_GROUPS.map((age) => age.name);
export const experienceOptions = EXPERIENCE_LEVEL_TYPE.map((exp) => exp.name);
export const educationOptions = EDUCATION_LEVELS.map((edu) => edu.name);
