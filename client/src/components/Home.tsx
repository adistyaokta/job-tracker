import { useState } from "react";
import beaver from "@/assets/beaver.svg";
import { Button } from "@/components/ui/button";
import { hcWithType } from "server/dist/client";
import { Link } from "react-router";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const client = hcWithType(SERVER_URL);

type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

function Home() {
	const [data, setData] = useState<
		Awaited<ReturnType<ResponseType["json"]>> | undefined
	>();

	async function sendRequest() {
		try {
			const res = await client.hello.$get();
			if (!res.ok) {
				console.log("Error fetching data");
				return;
			}
			const data = await res.json();
			setData(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<BriefcaseBusiness size={150} />
			<h1 className="text-5xl font-black">Job Tracker</h1>
			<h2 className="text-2xl font-bold">Apply. Track. Succeed.</h2>
			<p className="text-center">
				A simple way to organize and monitor every job application — so you
				never miss an update or opportunity.
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
