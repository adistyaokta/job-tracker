import type { ApiResponse, CreateJob, Job } from "shared";
import { axiosInstance } from "@/lib/axios";

export const getJobs = async () => {
	const response = await axiosInstance.get<ApiResponse<Job[]>>("/jobs");

	return response.data.data;
};

export const addJob = async (job: CreateJob) => {
	const response = await axiosInstance.post("/jobs", job);

	return response.data;
};
