import { useAuthStore } from "@/state/auth.state";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
	const { admin } = useAuthStore();
	return true ? <Outlet /> : <Navigate to={"/admin/login"} />;
};
