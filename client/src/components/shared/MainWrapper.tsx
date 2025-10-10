import { cn } from "@/lib/utils";
import type React from "react";

export const MainWrapper = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	return (
		<div
			className={cn("h-full max-h-dvh p-2 flex flex-col gap-2", className)}
			{...props}
		/>
	);
};
