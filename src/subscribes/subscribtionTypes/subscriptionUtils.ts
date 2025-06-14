export const subscriptionColor = (planId: string): string => {
	switch (planId) {
		case "free":
			return "#00000029";
		case "basic":
			return "silver-bg";
		case "gold":
			return "gold-bg";
		case "premium":
			return "premium-bg";
		case "enterprise":
			return "enterprise-bg";
		default:
			return "#00000029";
	}
};

export const getVisibleServices = (
	planId: string,
	services: {
		id?: string;
		featureName: string;
		price: number;
	}[],
) => {
	switch (planId) {
		case "basic":
			return services.slice(0, 6);
		case "gold":
			return services.slice(0, 13);
		case "premium":
		case "enterprise":
			return services;
		default:
			return services.slice(0, 1);
	}
};
