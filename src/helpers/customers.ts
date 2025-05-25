import {errorToast} from "../atoms/notifications/Toasts";
import {BookingData} from "../interfaces/booking";
import {deleteBookById} from "../services/booking";

export const handleDeletCustomerBook = async (customerBook: BookingData) => {
	if (window.confirm("האם אתה בטוח שברצונך לבטל את ההזמנה?")) {
		try {
			const deleted = await deleteBookById(customerBook._id);
			return deleted;
		} catch (err) {
			errorToast("שגיאה במחיקת ההזמנה");
		}
	}
};
