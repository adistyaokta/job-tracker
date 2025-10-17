/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface DateTimePickerProps {
	value?: any;
	onChange?: (value: any) => void;
	dateLabel?: string;
	timeLabel?: string;
	dateId?: string;
	timeId?: string;
	showLabel?: boolean;
}

export function DateTimePicker({
	value,
	onChange,
	dateLabel = "Date",
	timeLabel = "Time",
	dateId = "date-picker",
	timeId = "time-picker",
	showLabel = true,
}: DateTimePickerProps) {
	const [open, setOpen] = React.useState(false);

	const timeValue = value
		? format(value, "HH:mm:ss", { locale: id })
		: "00:00:00";

	// Handle date selection from calendar
	const handleDateChange = (newDate: Date | undefined) => {
		if (!newDate) return;

		const oldDate = value ?? new Date();
		// Preserve existing time
		newDate.setHours(oldDate.getHours());
		newDate.setMinutes(oldDate.getMinutes());
		newDate.setSeconds(oldDate.getSeconds());

		onChange?.(format(newDate, "yyyy-MM-dd'T'HH:mm:ss"));
		setOpen(false);
	};

	// Handle time input changes
	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const [hours, minutes, seconds] = e.target.value.split(":").map(Number);
		const oldDate = value ?? new Date();
		const newDate = new Date(oldDate);

		if (!Number.isNaN(hours)) newDate.setHours(hours);
		if (!Number.isNaN(minutes)) newDate.setMinutes(minutes);
		if (!Number.isNaN(seconds)) newDate.setSeconds(seconds);

		onChange?.(format(newDate, "yyyy-MM-dd'T'HH:mm:ss"));
	};

	return (
		<div className="flex gap-4">
			<div className="flex flex-col gap-2 grow">
				{showLabel && (
					<Label htmlFor={dateId} className="px-1">
						{dateLabel}
					</Label>
				)}
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							id={dateId}
							className="w-full justify-between font-normal"
						>
							{format(value, "dd MMMM yyyy", { locale: id })}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={value}
							captionLayout="dropdown"
							onSelect={handleDateChange}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col gap-2 grow">
				{showLabel && (
					<Label htmlFor={timeId} className="px-1">
						{timeLabel}
					</Label>
				)}
				<Input
					type="time"
					id={timeId}
					step="1"
					value={timeValue}
					onChange={handleTimeChange}
					className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
		</div>
	);
}
