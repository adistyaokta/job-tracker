import { BriefcaseBusiness, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function Home() {
	return (
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<BriefcaseBusiness size={150} />
			<h1 className="text-5xl font-black">Job Tracker</h1>
			<h2 className="text-2xl font-bold">Apply. Track. Succeed.</h2>
			<p className="text-center">
				A simple way to organize and monitor every job application.
			</p>
			<div className="flex items-center gap-4">
				<Button asChild>
					<Link to={"/dashboard"}>
						Start Now <ChevronRight />
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default Home;
