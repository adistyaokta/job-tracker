// utils/formatDate.ts
export const formatDate = (isoString: string) => {
	const date = new Date(isoString);
	const time = date.toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
	});
	const dayMonth = date.toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	return `${time} • ${dayMonth}`;
};
