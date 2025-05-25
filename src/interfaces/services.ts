export interface Services {
	businessName: string;
	email: string;
	phone: string;
	category: string;
	images: string[];
	description: string;
	priceType: string;
	price: {min: number; max: number};
	address: {city: string; street: string};
	availableDates: Date[];
	services: {
		id?: string;
		featureName: string;
		price: number;
	}[];
	vendorId: string;
	_id?: string;
}
export const vendorsServicesInitionalData = {
	businessName: "",
	email: "",
	phone: "",
	category: "",
	images: [],
	description: "",
	priceType: "",
	price: {
		min: 0,
		max: 0,
	},
	address: {
		city: "",
		street: "",
	},
	availableDates: [],
	services: [],
	vendorId: "",
};
