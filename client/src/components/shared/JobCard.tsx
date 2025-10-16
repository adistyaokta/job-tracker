import { statusClasses, statusLabels, type Job } from "shared";
import { formatDate } from "@/utils";
import { Badge } from "../ui/badge";
import { useJobStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type JobCardProps = {
	job: Job;
};

export const JobCard = ({ job }: JobCardProps) => {
	const setOpen = useJobStore((state) => state.setJobDialogOpen);
	const setSelectedJob = useJobStore((state) => state.setSelectedJob);

	const handleClick = () => {
		setOpen(true);
		setSelectedJob(job);
	};

	const getBadgeClassnames = () => {
		if (!job?.status) return "bg-gray-100 text-gray-600";
		return statusClasses[job.status];
	};

	return (
		<button
			type="button"
			tabIndex={0}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				handleClick();
			}}
			className="flex flex-col p-2 h-fit gap-1 rounded-lg cursor-pointer border border-primary/20 focus:bg-primary/10 hover:bg-primary/10 last:mb-20"
		>
			<div className="flex items-center justify-between w-full">
				<p className="font-bold truncate">{job.position}</p>
				<p className="text-xs">{job.type}</p>
			</div>
			<p className="text-sm w-fit">{job.company}</p>

			<div className="flex justify-between items-center w-full">
				<Badge className={cn("", getBadgeClassnames())}>
					{statusLabels[job.status]}
				</Badge>
				<p className="text-xs">{formatDate(job.createdAt ?? "")}</p>
			</div>
		</button>
	);
};
