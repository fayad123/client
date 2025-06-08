import {useState, useEffect} from "react";
import {Services} from "../interfaces/services";
import {getVendorData} from "../services/vendorServices";
import {getServiceByVendorId, getUnavailableDates} from "../services/vendorsServices";
import {getVisibleServices} from "../subscribes/subscribtionTypes/subscription";
import {JwtPayload} from "../interfaces/userSchema";
import {getVendorSubscriptionPlan} from "../services/usersServices";
import {WorkingHours} from "../components/editVendorPriofileAndServices/servicesFormik";

interface ServiceData {
	service: Services;
	unavailableDates: Date[];
	vendorId: string;
	visibleServices: {
		id?: string;
		featureName: string;
		price: number;
	}[];
	loading: boolean;
	error: Error | null;
	planId: string | null;
}

export const getDefaultWorkingHours = (): WorkingHours => ({
	sunday: {from: "", to: "", closed: false},
	monday: {from: "", to: "", closed: false},
	tuesday: {from: "", to: "", closed: false},
	wednesday: {from: "", to: "", closed: false},
	thursday: {from: "", to: "", closed: false},
	friday: {from: "", to: "", closed: false},
	saturday: {from: "", to: "", closed: false},
});

const initialServiceData = (): ServiceData => ({
	service: {
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
		planeId: "",
		maxBookingsPerDay: 0,
		allowOverlappingBookings: false,
		bookingDurationInHours: 1,
		bookingType: "single",
		workingHours: getDefaultWorkingHours(),
	},
	unavailableDates: [],
	vendorId: "",
	visibleServices: [],
	loading: true,
	error: null,
	planId: null,
});

export const useServiceData = (vendorId: string): ServiceData => {
	const [data, setData] = useState<ServiceData>(initialServiceData());

	useEffect(() => {
		if (!vendorId) return;
		const loadData = async () => {
			try {
				const [
					businessData,
					unavailableData,
					vendorProfileDataResult,
					subscriptionResponse,
				] = await Promise.all([
					getServiceByVendorId(vendorId),
					getUnavailableDates(vendorId),
					getVendorData(vendorId),
					getVendorSubscriptionPlan(vendorId),
				]);

				const vendorProfile: JwtPayload | null = Array.isArray(
					vendorProfileDataResult,
				)
					? vendorProfileDataResult[0]
					: vendorProfileDataResult;

				const subscriptionPlanId = (subscriptionResponse as JwtPayload)?.planId;
				const profilePlanId = vendorProfile?.planId;
				const effectivePlanId = subscriptionPlanId || profilePlanId || "basic";

				const visibleServices = getVisibleServices(
					effectivePlanId,
					businessData.services,
				);

				const parsedUnavailableDates = (
					unavailableData?.unavailableDates || []
				).map((d: string) => {
					const parsed = new Date(d);
					return isNaN(parsed.getTime()) ? new Date() : parsed;
				});

				setData({
					service: businessData,
					unavailableDates: parsedUnavailableDates,
					vendorId: vendorId,
					visibleServices,
					loading: false,
					error: null,
					planId: effectivePlanId,
				});
			} catch (error) {
				console.error("Error fetching service data:", error);
				setData((prev) => ({
					...prev,
					loading: false,
					error: error instanceof Error ? error : new Error("خطأ غير معروف"),
				}));
			}
		};

		loadData();
	}, [vendorId]);

	return data;
};
