import {useState, useEffect} from "react";
import {Services} from "../interfaces/services";
import {getVendorData} from "../services/vendorServices";
import {getServiceByVendorId, getUnavailableDates} from "../services/vendorsServices";
import {getVisibleServices} from "../subscribtionTypes/subscription";
import {JwtPayload} from "../interfaces/userSchema";
import { getVendorSubscriptionPlan } from "../services/usersServices";

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
}

export const useServiceData = (vendorId: string): ServiceData => {
	const [data, setData] = useState<ServiceData>({
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
		},
		unavailableDates: [],
		vendorId: "",
		visibleServices: [],
		loading: true,
		error: null,
	});

	useEffect(() => {
		const loadData = async () => {
			if (!vendorId) return;

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

				let effectivePlanId: string | undefined;

				if (
					subscriptionResponse &&
					typeof (subscriptionResponse as JwtPayload).planId === "string"
				) {
					effectivePlanId = (subscriptionResponse as JwtPayload).planId;
				} else if (vendorProfile && typeof vendorProfile.planId === "string") {
					effectivePlanId = vendorProfile.planId;
				} else {
					effectivePlanId = "basic";
				}

				let newVisibleServices = businessData.services;

				if (effectivePlanId) {
					newVisibleServices = getVisibleServices(
						effectivePlanId,
						businessData.services,
					);
				} else {
					console.warn(
						"No effective planId found, falling back to default services provided by getVisibleServices or showing all services.",
					);
					newVisibleServices = getVisibleServices(
						"basic",
						businessData.services,
					);
				}

				setData({
					service: businessData,
					unavailableDates: unavailableData.unavailableDates.map(
						(d: string) => new Date(d),
					),
					vendorId: vendorId,
					visibleServices: newVisibleServices,
					loading: false,
					error: null,
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
