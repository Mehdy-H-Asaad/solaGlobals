import { TAdmin } from "@/types";
import { create } from "zustand";
type TAuth = {
	admin: string | null;
	setAdmin: (admin: TAdmin) => void;
};

export const useAuthStore = create<TAuth>(set => {
	const token = localStorage.getItem("token");

	return {
		admin: token || null,
		setAdmin: (admin: TAdmin) => {
			localStorage.setItem("token", admin.token);

			set(() => ({
				admin: admin.token,
			}));
		},
	};
});
