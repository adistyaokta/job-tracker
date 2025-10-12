/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const AddJobModal = () => {
	return (
		<Dialog>
			<form action="">
				<DialogTrigger asChild>
					<Button size={"icon"} variant={"secondary"} className="rounded-full">
						<Plus className="size-6" />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="font-bold">Add new job</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="title">Company</Label>
							<Input
								id="company"
								name="company"
								placeholder="PT. Mencari Cinta Sejati"
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="title">Position</Label>
							<Input id="position" name="position" placeholder="IT Staff" />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="title">Platform</Label>
							<Input id="platform" name="platform" placeholder="LinkedIn" />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="title">Email</Label>
							<Input
								type="email"
								id="email"
								name="email"
								placeholder="email@gmail.com"
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="title">Link</Label>
							<Input
								id="link"
								name="link"
								placeholder="http://linkedin.com/job-link"
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="title">Type</Label>
							<DropdownMenu>
								<DropdownMenuTrigger className="border border-input rounded-md h-8">
									<p className="text-sm">Select Type</p>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>Full-Time</DropdownMenuItem>
									<DropdownMenuItem>Part-Time</DropdownMenuItem>
									<DropdownMenuItem>Freelance</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="title">Status</Label>
							<DropdownMenu>
								<DropdownMenuTrigger className="border border-input rounded-md h-8">
									<p className="text-sm">Select Status</p>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>Applied</DropdownMenuItem>
									<DropdownMenuItem>Interviewed</DropdownMenuItem>
									<DropdownMenuItem>Hired</DropdownMenuItem>
									<DropdownMenuItem>Rejected</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<DialogFooter>
						<div className="flex gap-2 items-center justify-center">
							<DialogClose asChild>
								<Button variant={"outline"} className="grow">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" className="grow">
								Submit
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};
