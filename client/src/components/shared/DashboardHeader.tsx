/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useDebounce } from "@/hooks";
import { useJobStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CircleX, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type DashboardHeaderProps = {
	searchValue: string;
	onSearchChange: (value?: string) => void;
};

export const DashboardHeader = ({
	onSearchChange,
	searchValue,
}: DashboardHeaderProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isSearch, setIsSearch] = useState(false);
	const [search, setSearch] = useState(searchValue);
	const debouncedSearch = useDebounce(search, 800);

	useEffect(() => {
		setSearch(searchValue);
		if (inputRef.current) inputRef.current.value = searchValue;

		if (searchValue === "") {
			setIsSearch(false);
		}
	}, [searchValue]);

	useEffect(() => {
		onSearchChange(debouncedSearch);
		if (debouncedSearch?.trim() !== "") {
			setIsSearch(true);
		}
	}, [debouncedSearch]);

	return (
		<div className="bg-primary rounded-lg text-primary-foreground text-lg py-3 px-2 flex justify-between items-center gap-2">
			<div className="flex gap-2 items-center justify-between grow">
				<h2
					className={cn(
						"grow max-w-1/2 truncate opacity-100",
						isSearch && "hidden opacity-0 lg:opacity-100 lg:block",
						"transition-all transition-discrete duration-300",
					)}
				>
					Hello, <span className="font-bold">Xannna</span>
				</h2>
				<div
					className={cn(
						"w-0 opacity-0 pointer-events-none",
						isSearch &&
							"ml-auto w-full opacity-100 lg:w-1/2 pointer-events-auto",
						"transform transition-all origin-right duration-300",
					)}
				>
					<Input
						ref={inputRef}
						type="search"
						className="bg-input text-primary"
						placeholder="Search something..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<Button
				variant="outline"
				size="icon"
				className={cn(
					"rounded-full bg-primary z-10",
					isSearch && "bg-input text-primary hover:bg-background/80 z-0",
				)}
				onClick={() => {
					if (isSearch) {
						setSearch("");
					}
					setIsSearch(!isSearch);

					if (!isSearch) {
						setTimeout(() => inputRef.current?.focus(), 0);
					}
				}}
			>
				{isSearch ? <X className="size-5" /> : <Search />}
			</Button>
		</div>
	);
};
