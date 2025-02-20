import { useAuthStore } from "@/state/auth.state";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
	const { admin } = useAuthStore();
	return admin ? <Outlet /> : <Navigate to={"/admin/login"} />;
};
