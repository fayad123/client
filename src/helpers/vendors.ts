import {errorToast} from "../atoms/notifications/Toasts";
import {BookingData} from "../interfaces/booking";
import {deleteBookById} from "../services/booking";

export const handleDeletBook = async (v: BookingData) => {
	if (window.confirm("האם אתה בטוח שברצונך לבטל את ההזמנה?")) {
		try {
			const deleted = await deleteBookById(v._id as string);
			return deleted;
		} catch (err) {
			errorToast("שגיאה במחיקת ההזמנה");
		}
	}
};



export	const formatCurrency = (value: number) => {
		return value.toLocaleString("he-IL", {
			currency: "ILS",
			style: "currency",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
	};