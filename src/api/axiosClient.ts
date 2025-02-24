import axios from "axios";
export const axiosClient = axios.create({
	baseURL: "https://solagroup.vercel.app",
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(
	config => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			window.location.replace("/admin/login");
		}
		return Promise.reject(error);
	}
);
