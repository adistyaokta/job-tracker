import { useJobStore } from "@/lib/store";

export const useJobDialog = () => {
	return useJobStore((state) => ({
		open: state.isJobDialogOpen,
		setOpen: state.setJobDialogOpen,
	}));
};
