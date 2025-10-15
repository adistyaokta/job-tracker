import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://192.168.60.45:3000",
	headers: {
		"Content-Type": "application/json",
	},
});
