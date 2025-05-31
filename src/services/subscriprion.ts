import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/business`;

export const subscriptionToPlans = async (
	vendorId: string,
	data: {isSubscribed: boolean; planId: string},
) => {
	try {
		const response = await axios.patch(`${api}/${vendorId}`, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
		});
		
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
