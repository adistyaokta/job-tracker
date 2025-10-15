import { queryOptions, useQuery } from "@tanstack/react-query";
import type { ApiResponse, Job } from "shared";
import { axiosInstance } from "@/lib/axios";
import type { QueryConfig } from "@/lib/query-client";

export const getJobs = async () => {
	const response = await axiosInstance.get<ApiResponse<Job[]>>("/jobs");

	return response.data.data;
};

export const getJobsQueryKey = () => ["jobs"];

const getJobsQueryOptions = () => {
	return queryOptions({
		queryKey: getJobsQueryKey(),
		queryFn: getJobs,
	});
};

type useGetJobsParams = {
	queryConfig?: QueryConfig<typeof getJobsQueryOptions>;
};

export const useGetJobs = (params: useGetJobsParams = {}) => {
	return useQuery({
		...getJobsQueryOptions(),
		...params.queryConfig,
	});
};
