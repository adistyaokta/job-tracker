import { Home, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AddJobModal } from "./AddJobModal";

export const Navigation = () => {
	const { pathname } = useLocation();

	return (
		<div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-primary w-1/2 2xl:w-1/5 min-w-40 rounded-full shadow-lg flex items-center p-2">
			<Button
				size={"icon"}
				className={cn(
					"opacity-50 hover:opacity-90",
					pathname === "/dashboard" && "opacity-100",
				)}
				asChild
			>
				<Link to={"/dashboard"}>
					<Home className="size-5" />
				</Link>
			</Button>

			<AddJobModal />

			<Button
				size={"icon"}
				className={cn(
					"opacity-50 hover:opacity-90",
					pathname === "/profile" && "opacity-100",
				)}
				asChild
			>
				<Link to={"/profile"}>
					<User className="size-5" />
				</Link>
			</Button>
		</div>
	);
};
