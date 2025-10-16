/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */

import { useForm } from "@tanstack/react-form";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import {
	type CreateJob,
	CreateJobSchema,
	type JobStatus,
	type JobType,
	statusLabels,
	typeLabels,
} from "shared/dist";
import { useAddJob } from "@/api/jobs";
import { useUpdateApplication } from "@/api/jobs/updateApplication";
import { useJobStore } from "@/lib/store";
import { formatDate } from "@/utils";
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
import { Link } from "react-router";
import { Divider } from "./Divider";

const defaultValues = {
	company: "",
	position: "",
	platform: "",
	email: null,
	link: null,
	type: "FULLTIME",
	status: "SAVED",
} as CreateJob;

export const JobModal = () => {
	const ref = useRef(null);
	const { isJobDialogOpen: open, setJobDialogOpen: setOpen } = useJobStore();
	const setSelectedJob = useJobStore((state) => state.setSelectedJob);
	const job = useJobStore((state) => state.selectedJob);

	const { mutate: addJobMutation, isPending: addJobPending } = useAddJob({
		mutationConfig: {
			onSuccess: () => {
				form.reset();
				setOpen(false);
			},
		},
	});
	const {
		mutate: updateApplicationMutation,
		isPending: updateApplicationPending,
	} = useUpdateApplication({
		mutationConfig: {
			onSuccess: () => {
				form.reset();
				setOpen(false);
			},
		},
	});

	const form = useForm({
		defaultValues: job ? job : defaultValues,
		validators: {
			onChange: CreateJobSchema,
		},
		onSubmit: async ({ value }) => {
			if (!job) {
				addJobMutation(value);
			}
			updateApplicationMutation(value);
		},
	});

	useEffect(() => {
		if (!job) return;
		form.reset(job);
	}, [job, form]);

	useEffect(() => {
		if (!open) {
			setSelectedJob(null);
			form.reset();
		}
	}, [open, setSelectedJob, form]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger ref={ref} asChild>
				<Button
					size={"icon"}
					variant={"secondary"}
					className="rounded-full mx-auto"
				>
					<Plus className="size-6" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-sm max-h-11/12 overflow-scroll no-scrollbar">
				<DialogDescription> </DialogDescription>
				<DialogHeader>
					<DialogTitle className="font-bold">
						{job ? "Update Application Detail" : "Add New Job"}
					</DialogTitle>
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
										disabled={!!job?.id}
										placeholder="Company you applied to"
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
										disabled={!!job?.id}
										placeholder="Job title or role"
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
										Platform
										{state.meta.errors.length > 0 && (
											<p className="text-xs text-destructive font-normal">
												*{state.meta.errors[0]?.message}
											</p>
										)}
									</Label>
									<Input
										id="platform"
										name="platform"
										disabled={!!job?.id}
										placeholder="Where you found the job (LinkedIn, Indeed, etc.)"
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
										Email
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
										disabled={!!job?.id}
										placeholder="Recruiter's or contact email"
										onChange={(e) => handleChange(e.target.value)}
										onBlur={handleBlur}
										value={state.value ?? ""}
									/>
								</div>
							)}
						</form.Field>
						<form.Field name="link">
							{({ state, handleChange, handleBlur }) => (
								<div className="grid gap-3">
									<Label htmlFor="link">
										Link
										{state.meta.errors.length > 0 && (
											<p className="text-xs text-destructive font-normal">
												*{state.meta.errors[0]?.message}
											</p>
										)}
									</Label>
									{job?.id ? (
										<Button asChild variant={"outline"}>
											<Link to={job?.link ?? "#"} className="text-sm">
												View Job
											</Link>
										</Button>
									) : (
										<Input
											id="link"
											name="link"
											placeholder="Link to job posting or application"
											onChange={(e) => handleChange(e.target.value)}
											onBlur={handleBlur}
											value={state.value ?? ""}
										/>
									)}
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
													onClick={() => handleChange(value as JobType)}
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
													onClick={() => handleChange(value as JobStatus)}
												>
													{label}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)}
						</form.Field>
						{job && (
							<>
								<Divider />

								<div className="p-2 bg-secondary rounded-md border border-primary/20 flex flex-col gap-2 text-xs lg:text-sm">
									<div className="flex justify-between">
										<Label>Applied At</Label>
										<p>{formatDate(job.createdAt ?? "")}</p>
									</div>
									<Divider />
									<div className="flex justify-between">
										<Label>Last Update</Label>
										<p>
											{job.updatedAt ? formatDate(job.updatedAt ?? "") : "-"}
										</p>
									</div>
								</div>
							</>
						)}
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
									<Button
										type="submit"
										className="grow"
										disabled={
											!canSubmit || addJobPending || updateApplicationPending
										}
									>
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
