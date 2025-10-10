import { MainWrapper } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const jobs = [
	{
		id: 1,
		jobTitle: "Front-End Developer",
		company: "Google",
		location: "Mountain View, CA",
		dateApplied: "2025-09-15",
		status: "Interview Scheduled",
		notes: "Technical interview on Oct 12",
	},
	{
		id: 2,
		jobTitle: "Product Designer",
		company: "Figma",
		location: "Remote",
		dateApplied: "2025-09-10",
		status: "Under Review",
		notes: "Waiting for recruiter response",
	},
	{
		id: 3,
		jobTitle: "Data Analyst",
		company: "Spotify",
		location: "New York, NY",
		dateApplied: "2025-09-20",
		status: "Rejected",
		notes: "Received rejection email on Sep 30",
	},
	{
		id: 4,
		jobTitle: "Backend Engineer",
		company: "Amazon",
		location: "Seattle, WA",
		dateApplied: "2025-09-22",
		status: "Phone Screen Completed",
		notes: "Waiting for feedback",
	},
	{
		id: 5,
		jobTitle: "UX Researcher",
		company: "Adobe",
		location: "San Francisco, CA",
		dateApplied: "2025-09-25",
		status: "Applied",
		notes: "No update yet",
	},
	{
		id: 6,
		jobTitle: "Software Engineer Intern",
		company: "Microsoft",
		location: "Remote",
		dateApplied: "2025-09-18",
		status: "Interview Scheduled",
		notes: "Second round interview on Oct 14",
	},
	{
		id: 7,
		jobTitle: "Marketing Coordinator",
		company: "HubSpot",
		location: "Boston, MA",
		dateApplied: "2025-09-12",
		status: "Offer Received",
		notes: "Considering offer",
	},
	{
		id: 8,
		jobTitle: "Data Scientist",
		company: "OpenAI",
		location: "San Francisco, CA",
		dateApplied: "2025-09-28",
		status: "Applied",
		notes: "Awaiting response",
	},
	{
		id: 9,
		jobTitle: "DevOps Engineer",
		company: "Atlassian",
		location: "Sydney, AUS",
		dateApplied: "2025-09-30",
		status: "Under Review",
		notes: "Recruiter follow-up next week",
	},
	{
		id: 10,
		jobTitle: "Project Manager",
		company: "Asana",
		location: "Remote",
		dateApplied: "2025-09-19",
		status: "Rejected",
		notes: "Will reapply next cycle",
	},
];

export const Dashboard = () => {
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
				<div className="overflow-y-auto h-full">
					{jobs.map((job) => (
						<div key={job.id} className="bg-secondary mb-2 p-2 rounded">
							<p className="font-bold">{job.jobTitle}</p>
							<p className="text-sm">{job.company}</p>
							<p className="text-xs">{job.status}</p>
						</div>
					))}
				</div>
			</div>
		</MainWrapper>
	);
};
