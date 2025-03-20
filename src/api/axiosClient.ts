import axios from "axios";
export const axiosClient = axios.create({
	baseURL: process.env.API_URL,
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
