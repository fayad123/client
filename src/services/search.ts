import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/services`;

export const fetchSearchResults = async (
	businessName: string,
	category: string,
	city: string,
	minPrice: number,
	maxPrice: number,
) => {
	try {
		const res = await axios.get(`${api}/search`, {
			params: {
				businessName: businessName,
				category: category,
				city: city,
				minPrice: minPrice,
				maxPrice: maxPrice,
			},
		});
		console.log(res.data);
	} catch (err) {
		console.log(err);
	}
};
