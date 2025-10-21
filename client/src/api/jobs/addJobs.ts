import { axiosInstance } from "@/lib/axios";
import type { MutationConfig } from "@/lib/query-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateJob } from "shared";
import { getJobsQueryKey } from "./getJobs";

export const addJob = async (job: CreateJob) => {
	const response = await axiosInstance.post("/jobs", job);

	return response.data;
};

type useAddJobParams = {
	mutationConfig?: MutationConfig<typeof addJob>;
};

export const useAddJob = (params: useAddJobParams = {}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addJob,
		...params.mutationConfig,
		onSuccess: (data, variables, onMutateResult, context) => {
			queryClient.invalidateQueries({ queryKey: getJobsQueryKey() });

			params.mutationConfig?.onSuccess?.(
				data,
				variables,
				onMutateResult,
				context,
			);
		},
	});
};
