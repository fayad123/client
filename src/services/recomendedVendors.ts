import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/services/recommended-services`;

export const getRecommendedVendors = async () => {
	try {
		const response = await axios.get(api);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
