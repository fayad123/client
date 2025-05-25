import axios from "axios";
import {BusinessUserSchema, LoginSchema, UserSchema} from "../interfaces/userSchema";

const api = `${import.meta.env.VITE_API_URI}`;

// Register customers
export const registerNewUser = async (userData: UserSchema) => {
	try {
		const response = await axios.post(`${api}/users`, userData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error: any) {
		console.log(error);
	}
};

// Register business users
export const newBusinessRegisterUser = async (userData: BusinessUserSchema) => {
	try {
		const response = await axios.post(`${api}/business`, userData, {
			headers: {"Content-Type": "application/json"},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// Login
export const userLogin = async (userData: LoginSchema) => {
	const response = await axios.post(`${api}/users/login`, userData, {
		headers: {"Content-Type": "application/json"},
	});
	return response.data;
};

// getUserById
export const getUserById = async (userId: string) => {
	const {data} = await axios.get(`${api}/users/for-vendors/${userId}`, {
		headers: {Authorization: localStorage.getItem("token")},
	});
	return data;
};

