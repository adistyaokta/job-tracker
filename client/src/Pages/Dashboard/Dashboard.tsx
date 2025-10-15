import { useGetJobs } from "@/api/jobs/getJobs";
import { MainWrapper } from "@/components/shared";
import { JobCard } from "@/components/shared/JobCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Search } from "lucide-react";

export const Dashboard = () => {
	const {
		data: jobs,
		isLoading: fetchJobsLoading,
		error: fetchJobsError,
	} = useGetJobs();

	return (
		<MainWrapper>
			<div className="bg-primary rounded-lg text-primary-foreground text-lg py-4 px-2 flex justify-between items-center">
				<h2>
					Hello, <span className="font-bold">Xannna</span>
				</h2>
				<Button
					variant={"outline"}
					size={"icon"}
					className="rounded-full bg-primary"
				>
					<Search />
				</Button>
			</div>
			<div className="grow rounded-lg overflow-hidden flex flex-col mt-2">
				<div className="overflow-y-auto h-full flex flex-col gap-2">
					{fetchJobsError && <p>Something went wrong.</p>}
					{fetchJobsLoading && !jobs && (
						<div className="h-40 flex items-center justify-center">
							<Spinner />
						</div>
					)}
					{!fetchJobsLoading && !jobs?.length && (
						<div className="h-40 flex items-center justify-center">
							no jobs yet
						</div>
					)}
					{!fetchJobsLoading &&
						jobs?.map((job) => <JobCard job={job} key={job.id} />)}
				</div>
			</div>
		</MainWrapper>
	);
};
