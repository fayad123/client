export interface JwtPayload {
	_id: string;
	name: {
		first: string;
		last: string;
	};
	phone: string;
	email: string;
	role: string;
	businessName: string;
	category: string;
	vendorId?: string;
	isSubscribed?: boolean;
	planId?: string;
	subscriptionDate?: Date;
	expiryDate?: Date;
}

export interface LoginSchema {
	email: string;
	password: string;
}

export interface UserSchema {
	name: {
		first: string;
		last: string;
	};
	email: string;
	password: string;
	phone: string;
	address: {
		city: string;
		street: string;
	};
}

export interface BusinessUserSchema {
	businessName: string;
	phone: string;
	email: string;
	password: string;
	address: {
		city: string;
		street: string;
	};
	category: string;
}

export interface usersMessages {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface VendorDataResponse {
	_id: {$oid: string};
	businessName: string;
	phone: string;
	email: string;
	role: string;
	pictures: {url: string; alt: string}[];
	address: {
		city: string;
		street: string;
		_id: {$oid: string};
	};
	category: string;
	planId?: string;
	expiryDate: Date | null;
	isSubscribed: boolean;
	subscriptionDate: Date | null;
	createdAt: {$date: string};
	updatedAt: {$date: string};
	recommendedServices: boolean;
	__v: number;
}
