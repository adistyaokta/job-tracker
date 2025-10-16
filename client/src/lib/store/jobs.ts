import type { Job } from 'shared';
import { create } from 'zustand';
import type { GetJobParams } from '@/api/jobs';

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL = 10;
export const initialParam: GetJobParams = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_TOTAL,
  search: '',
};

interface JobState {
  isJobDialogOpen: boolean;
  setJobDialogOpen: (payload: boolean) => void;
  selectedJob: Job | null;
  setSelectedJob: (payload: Job | null) => void;
  getJobParams: GetJobParams;
  setGetJobParams: (payload: GetJobParams) => void;
}

export const useJobStore = create<JobState>()((set) => ({
  isJobDialogOpen: false,
  selectedJob: null,
  getJobParams: initialParam,
  setJobDialogOpen: (payload) => set(() => ({ isJobDialogOpen: payload })),
  setSelectedJob: (payload) => set(() => ({ selectedJob: payload })),
  setGetJobParams: (payload) => set(() => ({ getJobParams: payload })),
}));
