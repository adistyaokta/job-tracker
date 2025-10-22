import { useGetJobs } from "@/api/jobs";
import { DashboardHeader, MainWrapper } from "@/components/shared";
import { FilterStatus } from "@/components/shared/FilterStatus";
import { JobCard } from "@/components/shared/JobCard";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { initialParam, useJobStore } from "@/lib/store";
import { BriefcaseBusiness, FunnelX } from "lucide-react";
import isEqual from "lodash/isEqual";
import { authClient } from "@/lib/auth-client";

export const Dashboard = () => {
	const { getJobParams, setGetJobParams } = useJobStore();
	const {
		data: jobs,
		isLoading: fetchJobsLoading,
		error: fetchJobsError,
		isFetching,
	} = useGetJobs({
		params: getJobParams,
	});

	const noFilters = isEqual(initialParam, getJobParams);

	return (
		<MainWrapper>
			<DashboardHeader
				searchValue={getJobParams.search ?? ""}
				onSearchChange={(value) => {
					setGetJobParams({ ...getJobParams, search: value });
				}}
			/>
			<div className="flex items-center justify-end gap-1">
				{!noFilters && (
					<Button
						disabled={noFilters}
						size={"icon"}
						onClick={() => setGetJobParams(initialParam)}
					>
						<FunnelX />
					</Button>
				)}
				<FilterStatus />
			</div>
			<div className="grow rounded-lg overflow-hidden flex flex-col">
				<div className="relative overflow-y-auto h-full flex flex-col gap-2 no-scrollbar shadow-2xl">
					{fetchJobsError && <p>Something went wrong.</p>}

					{fetchJobsLoading && !jobs && (
						<div className="m-auto w-fit flex items-center justify-center animate-bounce">
							<Spinner className="size-10" />
						</div>
					)}

					{!fetchJobsLoading && !jobs?.length && (
						<Empty>
							<EmptyHeader>
								<EmptyMedia variant="icon" className="size-14">
									<BriefcaseBusiness className="size-8" />
								</EmptyMedia>
								<EmptyTitle>No data</EmptyTitle>
								<EmptyDescription>No job application yet.</EmptyDescription>
							</EmptyHeader>
						</Empty>
					)}

					<div className="rounded-lg no-scrollbar grid grid-cols-1 md:grid-cols-3 gap-2 p-0.5">
						{!fetchJobsLoading &&
							jobs?.map((job) => <JobCard job={job} key={job.id} />)}
					</div>

					{isFetching && !fetchJobsLoading && (
						<div className="absolute inset-0 h-11/12 bg-white/20 backdrop-blur-sm flex justify-center items-center z-50">
							<div className="flex flex-col items-center gap-2 animate-fade-in">
								<Spinner className="size-10" />
							</div>
						</div>
					)}
				</div>
			</div>

			<Button
				className="absolute bottom-8"
				onClick={() => {
					const login = async () => {
						const { data, error } = await authClient.signUp.email({
							name: "John Doe", // required
							email: "john.doe@example.com", // required
							password: "password1234", // required
						});
						console.log("🚀 ~ login ~ error:", error);
						console.log("🚀 ~ login ~ data:", data);
					};
					login();
				}}
			>
				signup
			</Button>
		</MainWrapper>
	);
};
