import {useNavigate, useParams} from "react-router-dom";
import {FunctionComponent, useEffect, useState} from "react";
import {
	getServiceByVendorId,
	getUnavailableDates,
} from "../../../services/halsDecoration";
import {customToast, errorToast, successToast} from "../../../atoms/notifications/Toasts";
import {newbooking} from "../../../services/booking";
import {useFormik} from "formik";
import * as yup from "yup";
import {useUser} from "../../../contextApi/useUserData";
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	ImageList,
	ImageListItem,
	TextField,
	Typography,
} from "@mui/material";
import Calendar from "../../../atoms/calendar/Calendar";
import {Services} from "../../../interfaces/services";
interface SingleServicePageProps {}

const SingleServicePage: FunctionComponent<SingleServicePageProps> = () => {
	const {vendorId} = useParams();
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const {user} = useUser();
	const [bookingSuccess, setBookingSucess] = useState<boolean>(false);

	const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [isDateAvailable, setIsDateAvailable] = useState<boolean>(true);
	const [service, setService] = useState<Services>({
		businessName: "",
		email: "",
		phone: "",
		category: "",
		images: [],
		services: [],
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
		vendorId: "",
	});

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			try {
				const [businessData, unavailableData] = await Promise.all([
					getServiceByVendorId(vendorId as string),
					getUnavailableDates(vendorId as string),
				]);
				setService(businessData);
				setUnavailableDates(
					unavailableData.unavailableDates.map((d) => new Date(d)),
				);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, [vendorId]);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		const formatted = date.toISOString().split("T")[0];
		const available = !unavailableDates.some(
			(d) => d.toISOString().split("T")[0] === formatted,
		);
		setIsDateAvailable(available);
		if (!available) {
			errorToast("لا يمكن الحجز في التاريخ الذي حددته، يرجى اختيار تاريخ آخر");
		}
	};

	const handleFeatureToggle = (feature: {featureName: string; price: number}) => {
		const exists = formik.values.features.some(
			(f) => f.featureName === feature.featureName,
		);
		const cleanedFeature = {
			featureName: feature.featureName,
			price: feature.price,
		}; // remove _id or other extra fields
		formik.setFieldValue(
			"features",
			exists
				? formik.values.features.filter(
						(f) => f.featureName !== feature.featureName,
				  )
				: [...formik.values.features, cleanedFeature],
		);
	};

	const formik = useFormik({
		initialValues: {
			features: [] as {featureName: string; price: number}[],
			note: "",
		},
		validationSchema: yup.object({
			features: yup
				.array()
				.of(
					yup.object({
						featureName: yup.string().required(),
						price: yup.number().required(),
					}),
				)
				.min(1, "יש לבחור לפחות תכונה אחת"),
			note: yup.string(),
		}),
		onSubmit: async (values, {resetForm}) => {
			if (!user) {
				customToast(
					"يجب عليك تسجيل الدخول لتستفيد من جميع خدماتنا المميزة",
					navigate,
				);
				return;
			}

			try {
				await newbooking({
					date: selectedDate.toISOString(),
					services: values.features,
					businessName: service?.businessName || "خدمة",
					note: values.note,
					vendorId: vendorId as string,
				});
				successToast(
					`تم إرسال الطلب لتاريخ ${selectedDate.toLocaleDateString()} مع الخدمات:\n${values.features
						.map((f) => `${f.featureName} - ${f.price} ₪`)
						.join(", ")}`,
				);
				setBookingSucess(true);
				resetForm();
			} catch (err) {
				console.log(err);
			}
		},
	});

	if (loading)
		return (
			<div className='text-center mt-5'>
				<CircularProgress />
			</div>
		);

	if (bookingSuccess) {
		return (
			<main>
				<div className='container text-center my-5'>
					<Typography variant='h4' color='primary'>
						تم إرسال طلبك بنجاح!
					</Typography>
					<Typography variant='body1' className='my-3'>
						سيتم التواصل معك قريبًا لتأكيد الطلب.
					</Typography>
					<Button
						variant='contained'
						color='primary'
						onClick={() => navigate("/")}
					>
						العودة إلى الصفحة الرئيسية
					</Button>
				</div>
			</main>
		);
	}

	return (
		<div style={{fontFamily: "monospace"}} className='container my-5'>
			<hr className='mb-5' />
			<h1 className='text-center mb-4'>{service.businessName}</h1>

			<Typography color='warning' variant='h6' align='center' className='mb-3'>
				📍 الموقع: {service.address.city}, {service.address.street}
			</Typography>

			<hr className='mb-5' />
			{/* Images view */}
			<div className=' container text-center w-75'>
				<ImageList variant='woven' cols={3} gap={8}>
					{service.images?.map((item, index) => (
						<ImageListItem key={index}>
							<img
								srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
								src={`${item}?w=161&fit=crop&auto=format`}
								alt={item}
								loading='lazy'
							/>
						</ImageListItem>
					))}
				</ImageList>
			</div>
			<Box>
				<Typography
					sx={{
						backgroundColor: "#000000eb",
						fontFamily: "monospace",
					}}
					variant='h5'
					className='text-center my-5 text-white fw-bold p-3 lh-base rounded-5'
				>
					{service.description}
				</Typography>
			</Box>

			{/* Calendar */}
			<div className='text-center mb-4'>
				<Calendar
					selectedDate={selectedDate}
					handleDateChange={handleDateChange}
					unavailableDates={unavailableDates}
				/>
				<Typography
					variant='body1'
					className='mt-2'
					color={isDateAvailable ? "green" : "red"}
				>
					{isDateAvailable ? "التاريخ متاح" : "التاريخ غير متاح"}
				</Typography>
			</div>

			{/* Booking Form */}
			<form onSubmit={formik.handleSubmit} className='mt-5'>
				<Typography variant='h5' align='center' gutterBottom>
					اختر الخدمات المطلوبة
				</Typography>
				<div className='row row-cols-2 m-auto bg-light p-3 rounded-3 shadow-lg'>
					{service.services.length > 0 &&
						service.services.map((item, index) => (
							<FormControlLabel
								key={index}
								control={
									<Checkbox
										checked={formik.values.features.some(
											(f) => f.featureName === item.featureName,
										)}
										onChange={() => handleFeatureToggle(item)}
										color='primary'
									/>
								}
								label={`${
									item.featureName
								} - ${item.price.toLocaleString()} ₪`}
								className='text-end mb-3'
							/>
						))}

					<TextField
						fullWidth
						name='note'
						label='ملاحظات إضافية (اختياري)'
						multiline
						rows={3}
						value={formik.values.note}
						onChange={formik.handleChange}
						error={formik.touched.note && Boolean(formik.errors.note)}
						helperText={formik.touched.note && formik.errors.note}
						className='mt-3'
					/>
					<div className='text-center mt-4 w-100'>
						<Button
							disabled={
								!(formik.isValid && formik.dirty && isDateAvailable)
							}
							type='submit'
							variant='outlined'
							color='primary'
							size='large'
						>
							احجز الآن
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SingleServicePage;
