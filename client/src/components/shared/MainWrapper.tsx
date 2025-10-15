import type React from "react";
import { cn } from "@/lib/utils";
import { Navigation } from "./Navigation";

export const MainWrapper = ({
	className,
	children,
	...props
}: React.ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"grow md:max-w-7xl p-2 flex flex-col gap-2 relative overflow-hidden rounded-lg border bg-background",
				className,
			)}
			{...props}
		>
			{children}
			<Navigation />
		</div>
	);
};
