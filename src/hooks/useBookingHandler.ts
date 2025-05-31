import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useUser } from "../contextApi/useUserData";
import { errorToast, successToast } from "../atoms/notifications/Toasts";
import { newbooking } from "../services/booking";


interface BookingState {
	success: boolean;
	loading: boolean;
	error: Error | null;
}

interface BookingValues {
	features: Array<{featureName: string; price: number}>;
	note: string;
}

export const useBookingHandler = () => {
	const [bookingState, setBookingState] = useState<BookingState>({
		success: false,
		loading: false,
		error: null,
	});

	const navigate = useNavigate();
	const {user} = useUser();

	const handleBooking = async (
		values: BookingValues,
		selectedDate: Date,
		vendorId: string,
		businessName: string,
	) => {
		if (!user) {
			errorToast("Please login to book services");
			navigate("/login");
			return {success: false};
		}

		setBookingState((prev) => ({...prev, loading: true}));

		try {
			await newbooking({
				date: selectedDate.toISOString(),
				services: values.features,
				businessName,
				note: values.note,
				vendorId,
			});

			successToast(`Booking confirmed for ${selectedDate.toLocaleDateString()}`);

			setBookingState({
				success: true,
				loading: false,
				error: null,
			});

			return {success: true};
		} catch (error) {
			const err = error instanceof Error ? error : new Error("Booking failed");
			errorToast(err.message);

			setBookingState({
				success: false,
				loading: false,
				error: err,
			});

			return {success: false, error: err};
		}
	};

	return {
		bookingState,
		handleBooking,
	};
};
