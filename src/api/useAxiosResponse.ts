import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "./axiosClient";

export const useAxiosResponse = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const responseInterceptor = axiosClient.interceptors.response.use(
			response => response,
			async error => {
				if (
					error.response?.status === 401 &&
					location.pathname.startsWith("/admin")
				) {
					localStorage.removeItem("token");
					navigate("/admin/login");
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosClient.interceptors.response.eject(responseInterceptor);
		};
	}, [location, navigate]);
};
