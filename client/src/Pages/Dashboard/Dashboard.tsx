import { useGetJobs } from "@/api/jobs";
import { DashboardHeader, MainWrapper } from "@/components/shared";
import { JobCard } from "@/components/shared/JobCard";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useJobStore } from "@/lib/store";
import { BriefcaseBusiness } from "lucide-react";

export const Dashboard = () => {
	const { getJobParams } = useJobStore();
	console.log("🚀 ~ Dashboard ~ getJobParams:", getJobParams);
	const {
		data: jobs,
		isLoading: fetchJobsLoading,
		error: fetchJobsError,
	} = useGetJobs({
		params: getJobParams
	});

	return (
		<MainWrapper>
			<DashboardHeader />
			<div className="grow rounded-lg overflow-hidden flex flex-col mt-2">
				<div className="overflow-y-auto h-full flex flex-col gap-2 no-scrollbar shadow-2xl">
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
								<EmptyDescription>No job application found</EmptyDescription>
							</EmptyHeader>
						</Empty>
					)}
					<div className="rounded-lg no-scrollbar grid grid-cols-1 md:grid-cols-3 gap-2 p-0.5">
						{!fetchJobsLoading &&
							jobs?.map((job) => <JobCard job={job} key={job.id} />)}
					</div>
				</div>
			</div>
		</MainWrapper>
	);
};
