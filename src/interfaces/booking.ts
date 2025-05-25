export interface BookingData {
	_id?: string;
	date: Date;
	services: {featureName: string; price: number; _id?: string}[];
	userId: string;
	businessName: string;
	status: string;
	note?: string;
}

export const BookingDataValues: BookingData = {
	_id: "",
	date: new Date(),
	services: [],
	userId: "",
	businessName: "",
	status: "Pending",
	note: "",
};
