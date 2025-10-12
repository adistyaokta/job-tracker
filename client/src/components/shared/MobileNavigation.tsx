import { Home, Search, Plus, Bell, User } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { AddJobModal } from "./AddJobModal";

export const MobileNavigation = () => {
	const { pathname } = useLocation();

	return (
		<div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-primary w-10/12 rounded-full shadow-lg flex justify-around items-center p-2">
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
