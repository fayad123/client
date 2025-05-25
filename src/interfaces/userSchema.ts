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
