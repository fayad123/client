import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/chairses`;

export async function getChairsesServices() {
	try {
		const response = await axios.get(api);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}
