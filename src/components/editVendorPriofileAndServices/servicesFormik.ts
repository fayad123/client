import * as yup from "yup";

export const vendorsvalidationSchema = yup.object({
	businessName: yup.string().required("اسم التجاري مطلوب"),
	phone: yup.string().required("رقم الهاتف مطلوب"),
	category: yup.string().required("الفئة مطلوبة"),
	description: yup.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف"),
	priceType: yup.string().required("نوع السعر مطلوب"),
	price: yup.object({
		min: yup.number().min(0, "يجب أن يكون السعر موجب").required("السعر الأدنى مطلوب"),
		max: yup
			.number()
			.min(yup.ref("min"), "السعر الأقصى يجب أن يكون أكبر من أو يساوي السعر الأدنى")
			.required("السعر الأقصى مطلوب"),
	}),
	address: yup.object({
		city: yup.string().required("المدينة مطلوبة"),
		street: yup.string().required("الشارع مطلوب"),
	}),
	maxBookingsPerDay: yup
		.number()
		.min(1, "يجب أن يكون 1 على الأقل")
		.required("أقصى عدد حجوزات في اليوم مطلوب"),
	allowOverlappingBookings: yup.boolean(),
	bookingDurationInHours: yup
		.number()
		.min(0.5, "المدة يجب أن تكون نصف ساعة على الأقل")
		.required("مدة الحجز مطلوبة"),
	bookingType: yup
		.string()
		.oneOf(["daily", "hourly", "multi-booking"], "نوع الحجز غير صالح")
		.required("نوع الحجز مطلوب"),
	workingHours: yup.object({
		sunday: yup.object({
			from: yup.string(),
			to: yup.string(),
			closed: yup.boolean(),
		}),
		monday: yup.object({
			from: yup.string(),
			to: yup.string(),
			closed: yup.boolean(),
		}),
		tuesday: yup.object({
			from: yup.string(),
			to: yup.string(),
			closed: yup.boolean(),
		}),
		wednesday: yup.object({
			from: yup.string(),
			to: yup.string(),
			closed: yup.boolean(),
		}),
		thursday: yup.object({
			from: yup.string(),
			to: yup.string(),
			closed: yup.boolean(),
		}),
		friday: yup.object({
			closed: yup.boolean().required(),
			from: yup.string(),
			to: yup.string(),
		}),
		saturday: yup.object({
			closed: yup.boolean().required(),
			from: yup.string(),
			to: yup.string(),
		}),
	}),
});

type DaySchedule = {
	from: string;
	to: string;
	closed: boolean;
};

export type WorkingHours = {
	sunday: DaySchedule;
	monday: DaySchedule;
	tuesday: DaySchedule;
	wednesday: DaySchedule;
	thursday: DaySchedule;
	friday: DaySchedule;
	saturday: DaySchedule;
};

export const days: {key: keyof WorkingHours; label: string}[] = [
	{key: "sunday", label: "الأحد"},
	{key: "monday", label: "الاثنين"},
	{key: "tuesday", label: "الثلاثاء"},
	{key: "wednesday", label: "الأربعاء"},
	{key: "thursday", label: "الخميس"},
	{key: "friday", label: "الجمعة"},
	{key: "saturday", label: "السبت"},
];
