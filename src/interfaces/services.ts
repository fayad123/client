export interface Services {
	businessName: string;
	email: string;
	phone: string;
	category: string;
	images?: {url: string; alt: string; _id?: string}[];
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
	planeId?: string;
	maxBookingsPerDay: number;
	allowOverlappingBookings: boolean;
	bookingDurationInHours: number;
	bookingType: string;
	workingHours: {
		sunday: {from: string; to: string; closed: boolean};
		monday: {from: string; to: string; closed: boolean};
		tuesday: {from: string; to: string; closed: boolean};
		wednesday: {from: string; to: string; closed: boolean};
		thursday: {from: string; to: string; closed: boolean};
		friday: {from?: string; to?: string; closed: boolean};
		saturday: {from?: string; to?: string; closed: boolean};
	};
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
	maxBookingsPerDay: 1,
	allowOverlappingBookings: false,
	bookingDurationInHours: 1,
	bookingType: "daily",
	workingHours: {
		sunday: {from: "09:00", to: "17:00", closed: false},
		monday: {from: "09:00", to: "17:00", closed: false},
		tuesday: {from: "09:00", to: "17:00", closed: false},
		wednesday: {from: "09:00", to: "17:00", closed: false},
		thursday: {from: "09:00", to: "17:00", closed: false},
		friday: {closed: true},
		saturday: {closed: true},
	},
	planeId: "",
};
