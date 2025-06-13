export const getCoordinates = async (
	city: string,
	street: string,
): Promise<{lat: number; lng: number}> => {
	// تحسين صيغة البحث لإسرائيل
	const addressQuery = [street, city, "Israel"].filter(Boolean).join(", ");

	const response = await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
			addressQuery,
		)}&countrycodes=il&accept-language=he`,
	);

	const data = await response.json();

	if (data.length > 0) {
		return {
			lat: parseFloat(data[0].lat),
			lng: parseFloat(data[0].lon),
		};
	}

	// محاولة البحث بدون الشارع إذا فشلت المحاولة الأولى
	const fallbackResponse = await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
			city + ", Israel",
		)}&countrycodes=il`,
	);

	const fallbackData = await fallbackResponse.json();

	if (fallbackData.length > 0) {
		return {
			lat: parseFloat(fallbackData[0].lat),
			lng: parseFloat(fallbackData[0].lon),
		};
	}

	throw new Error("Location not found");
};
