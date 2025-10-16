export type Meta = {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
};
export type ApiResponse<T> = {
	message: string;
	data: T;
	meta?: Meta;
};
export type GetParams = {
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: string;
	order?: "asc" | "desc";
};
