import { MainWrapper } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings } from "lucide-react";

export const Profile = () => {
	return (
		<MainWrapper>
			<div className="flex flex-col gap-2 items-center justify-center grow text-7xl">
				🚧 Coming Soon 👷🏽‍♂️
				<p className="text-lg">Profile page is under construction....</p>
			</div>
			{/* <div className="bg-primary rounded-lg text-primary-foreground text-center text-lg px-2 py-4 justify-center items-center">
				<h3>Profile</h3>
			</div>
			<div className="py-4 flex flex-col justify-center items-center gap-2">
				<Avatar className="size-1/2 border-2 border-primary">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>OO</AvatarFallback>
				</Avatar>
				<p className="text-lg font-bold">Xannna</p>
			</div>
			<div className="grow flex flex-col p-2 gap-1 text-md border-t-2 border-primary">
				<div className="flex px-2 py-3 justify-between items-center">
					<span className="flex gap-2 items-center">
						<Settings className="size-5" />
						Settings
					</span>
					<ArrowRight />
				</div>
				<div className="flex px-2 py-3 justify-between items-center">
					<span className="flex gap-2 items-center">
						<Settings className="size-5" />
						Settings
					</span>
					<ArrowRight />
				</div>
				<div className="flex px-2 py-3 justify-between items-center">
					<span className="flex gap-2 items-center">
						<Settings className="size-5" />
						Settings
					</span>
					<ArrowRight />
				</div>
			</div> */}
		</MainWrapper>
	);
};
