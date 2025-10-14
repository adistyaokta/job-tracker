/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { useForm } from "@tanstack/react-form";
import { Plus } from "lucide-react";
import {
	JobSchema,
	type JobStatus,
	type JobType,
	statusLabels,
	typeLabels,
} from "shared/dist";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
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
import axios from "axios";

const defaultValues = {
	company: "",
	position: "",
	platform: "",
	email: "",
	link: "",
	type: "FULLTIME",
	status: "APPLIED",
};

export const AddJobModal = () => {
	const form = useForm({
		defaultValues,
		validators: {
			onChange: JobSchema,
		},
		onSubmit: async ({ value }) => {
			const data = await axios.post("http://localhost:3000/jobs", value);

			console.log("🚀 ~ AddJobModal ~ data:", data);
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={"icon"}
					variant={"secondary"}
					className="rounded-full mx-auto fixed"
				>
					<Plus className="size-6" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-sm max-h-11/12 overflow-scroll">
				<DialogDescription> </DialogDescription>
				<DialogHeader>
					<DialogTitle className="font-bold">Add new job</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="flex flex-col gap-4"
				>
					<div className="grid gap-4 p-0.5">
						<form.Field name="company">
							{({ state, handleChange, handleBlur }) => (
								<div className="grid gap-3">
									<Label htmlFor="company">
										Company
										{state.meta.errors.length > 0 && (
											<p className="text-xs text-destructive font-normal">
												*{state.meta.errors[0]?.message}
											</p>
										)}
									</Label>
									<Input
										id="company"
										name="company"
										placeholder="PT. Mencari Cinta Sejati"
										onChange={(e) => handleChange(e.target.value)}
										onBlur={handleBlur}
										value={state.value}
									/>
								</div>
							)}
						</form.Field>

						<form.Field name="position">
							{({ state, handleChange, handleBlur }) => (
								<div className="grid gap-3">
									<Label htmlFor="position">
										Position
										{state.meta.errors.length > 0 && (
											<p className="text-xs text-destructive font-normal">
												*{state.meta.errors[0]?.message}
											</p>
										)}
									</Label>
									<Input
										id="position"
										name="position"
										placeholder="IT Staff"
										onChange={(e) => handleChange(e.target.value)}
										onBlur={handleBlur}
										value={state.value}
									/>
								</div>
							)}
						</form.Field>
						<form.Field name="platform">
							{({ state, handleChange, handleBlur }) => (
								<div className="grid gap-3">
									<Label htmlFor="platform">
										Platform{" "}
										{state.meta.errors.length > 0 && (
											<p className="text-xs text-destructive font-normal">
												*{state.meta.errors[0]?.message}
											</p>
										)}
									</Label>
									<Input
										id="platform"
										name="platform"
										placeholder="LinkedIn"
										onChange={(e) => handleChange(e.target.value)}
										onBlur={handleBlur}
										value={state.value}
									/>
								</div>
							)}
						</form.Field>
						<form.Field name="email">
							{({ state, handleChange, handleBlur }) => (
								<div className="grid gap-3">
									<Label htmlFor="email">
										Email{" "}
										{state.meta.errors.length > 0 && (
											<p className="text-xs text-destructive font-normal">
												*{state.meta.errors[0]?.message}
											</p>
										)}
									</Label>
									<Input
										type="email"
										id="email"
										name="email"
										placeholder="email@gmail.com"
										onChange={(e) => handleChange(e.target.value)}
										onBlur={handleBlur}
										value={state.value}
									/>
								</div>
							)}
						</form.Field>
						<form.Field name="link">
							{({ state, handleChange, handleBlur }) => (
								<div className="grid gap-3">
									<Label htmlFor="link">
										Link{" "}
										{state.meta.errors.length > 0 && (
											<p className="text-xs text-destructive font-normal">
												*{state.meta.errors[0]?.message}
											</p>
										)}
									</Label>
									<Input
										id="link"
										name="link"
										placeholder="http://linkedin.com/job-link"
										onChange={(e) => handleChange(e.target.value)}
										onBlur={handleBlur}
										value={state.value}
									/>
								</div>
							)}
						</form.Field>
						<form.Field name="type">
							{({ state, handleChange }) => (
								<div className="grid gap-3">
									<Label htmlFor="title">Type</Label>
									<DropdownMenu>
										<DropdownMenuTrigger className="border border-input rounded-md h-8">
											<p className="text-sm">
												{state.value
													? typeLabels[state.value as JobType]
													: "Select Type"}
											</p>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{Object.entries(typeLabels).map(([value, label]) => (
												<DropdownMenuItem
													key={value}
													onClick={() => handleChange(value)}
												>
													{label}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)}
						</form.Field>
						<form.Field name="status">
							{({ state, handleChange }) => (
								<div className="grid gap-3">
									<Label htmlFor="title">Status</Label>
									<DropdownMenu>
										<DropdownMenuTrigger className="border border-input rounded-md h-8">
											<p className="text-sm">
												{state.value
													? statusLabels[state.value as JobStatus]
													: "Select Status"}
											</p>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{Object.entries(statusLabels).map(([value, label]) => (
												<DropdownMenuItem
													key={value}
													onClick={() => handleChange(value)}
												>
													{label}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)}
						</form.Field>
					</div>
					<DialogFooter>
						<div className="flex gap-2 items-center justify-center">
							<DialogClose asChild>
								<Button variant={"outline"} className="grow">
									Cancel
								</Button>
							</DialogClose>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
							>
								{([canSubmit, isSubmitting]) => (
									<Button type="submit" className="grow" disabled={!canSubmit}>
										{isSubmitting ? "..." : "Submit"}
									</Button>
								)}
							</form.Subscribe>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
