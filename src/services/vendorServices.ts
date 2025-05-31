import axios from "axios";

const api = `${import.meta.env.VITE_API_URI}/services`;

// create new service for spicific vendor
export const addVendorService = async (
	vendorId: string,
	data: {featureName: string; price: number},
) => {
	try {
		const service = await axios.post(`${api}/${vendorId}`, data, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
	}
};

// gell all services for spicific vendor
export const getVendorData = async (vendorId: string) => {
	try {
		const service = await axios.get(`${api}/vendor/${vendorId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
	}
};

// update spicific vendor data
export const updateVendorServices = async (vendorId: string, newService: any) => {
	try {
		const service = await axios.put(`${api}/${vendorId}`, newService, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
	}
};

// remove exist service from spicific vendor
export const removeVendorService = async (vendorId: string, serviceId: string) => {
	try {
		const service = await axios.delete(`${api}/${vendorId}/${serviceId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return service.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

