import { queryOptions, useQuery } from "@tanstack/react-query";
import type { ApiResponse, GetParams, Job } from "shared";
import { axiosInstance } from "@/lib/axios";
import type { QueryConfig } from "@/lib/query-client";

export type GetJobParams = GetParams & {
	status?: string;
};

export const getJobs = async (params?: GetJobParams) => {
	const response = await axiosInstance.get<ApiResponse<Job[]>>("/jobs", {
		params,
	});

	return response.data.data;
};

export const getJobsQueryKey = (params?: GetJobParams) =>
	params ? ["jobs", params] : ["jobs"];

const getJobsQueryOptions = (params?: GetJobParams) => {
	return queryOptions({
		queryKey: getJobsQueryKey(params),
		queryFn: () => getJobs(params),
	});
};

type UseGetJobsParams = {
	params?: GetJobParams;
	queryConfig?: QueryConfig<typeof getJobsQueryOptions>;
};

export const useGetJobs = ({ params, queryConfig }: UseGetJobsParams = {}) => {
	return useQuery({
		...getJobsQueryOptions(params),
		...queryConfig,
	});
};
