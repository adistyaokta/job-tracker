import { cn } from "@/lib/utils";
import type React from "react";
import { MobileNavigation } from "./MobileNavigation";

export const MainWrapper = ({
	className,
	children,
	...props
}: React.ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"h-full min-h-dvh max-h-dvh p-2 flex flex-col gap-2 relative overflow-hidden",
				className,
			)}
			{...props}
		>
			{children}
			<MobileNavigation />
		</div>
	);
};
