import {Services} from "../interfaces/services";

interface ServiceStructuredDataProps {
	serviceType: string;
	serviceUrl: string;
	providerName?: string;
	countryName?: string;
	countryCode?: string;
}

// For a general description of a category or type of service (e.g., "car decoration")
export const generateServiceJsonLd = ({
	serviceType,
	serviceUrl,
	providerName = "أفراحنا",
	countryName = "اسرائيل",
	countryCode = "IL",
}: ServiceStructuredDataProps) => ({
	"@context": "https://schema.org",
	"@type": "Service",
	serviceType: serviceType,
	provider: {
		"@type": "Organization",
		name: providerName,
		url: serviceUrl,
	},
	areaServed: {
		"@type": "Country",
		name: countryName,
	},
	availableChannel: {
		"@type": "ServiceChannel",
		serviceLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressCountry: countryCode,
			},
		},
	},
});


// On an individual service page (e.g., a specific seller's page)
export const generateSingleServiceJsonLd = (service: Services) => ({
	"@context": "https://schema.org",
	"@type": "Service",
	name: service.businessName,
	description: service.description || "خدمة مميزة من أفراحنا",
	url: `https://client-afrahna.vercel.app/service/${service.vendorId}`,
	image: service.images?.[0]?.url,
	provider: {
		"@type": "LocalBusiness",
		name: service.businessName,
		address: {
			"@type": "PostalAddress",
			streetAddress: service.address.street,
			addressLocality: service.address.city,
			addressCountry: "IL",
		},
	},
	offers: {
		"@type": "Offer",
		price: service.price || 0,
		priceCurrency: "ILS",
		url: `https://client-afrahna.vercel.app/service/${service.vendorId}`,
	},
});


// When displaying a list of services on the same page
export const generateCategoriesItemListJsonLd = (
	categories: {label: string; link: string}[],
) => ({
	"@context": "https://schema.org",
	"@type": "ItemList",
	itemListElement: categories.map((item, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: item.label,
		url: `https://client-afrahna.vercel.app${item.link}`,
	})),
});
