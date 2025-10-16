import { cn } from "@/lib/utils";
import type React from "react";

export const Divider = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	return (
		<div
			className={cn("w-full h-0.5 rounded-full bg-primary/20", className)}
			{...props}
		/>
	);
};
