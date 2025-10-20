import { axiosInstance } from "@/lib/axios";
import type { MutationConfig } from "@/lib/query-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateJob } from "shared";
import { getJobsQueryKey } from "./getJobs";

export const updateApplication = async (job: UpdateJob) => {
	const response = await axiosInstance.put(`/api/jobs/${job.id}`, job);

	return response.data;
};

type useUpdateApplicationParams = {
	mutationConfig?: MutationConfig<typeof updateApplication>;
};

export const useUpdateApplication = (
	params: useUpdateApplicationParams = {},
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateApplication,
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
