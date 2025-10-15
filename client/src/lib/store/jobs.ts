import type { Job } from "shared";
import { create } from "zustand";

interface JobState {
	isJobDialogOpen: boolean;
	setJobDialogOpen: (payload: boolean) => void;
	selectedJob: Job | null;
	setSelectedJob: (payload: Job | null) => void;
}

export const useJobStore = create<JobState>()((set) => ({
	isJobDialogOpen: false,
	selectedJob: null,
	setJobDialogOpen: (payload) => set(() => ({ isJobDialogOpen: payload })),
	setSelectedJob: (payload) => set(() => ({ selectedJob: payload })),
}));
