import {useNavigate, useParams} from "react-router-dom";
import {FunctionComponent, useState} from "react";
import {
	customToast,
	errorToast,
	successToast,
} from "../../../../atoms/notifications/Toasts";
import {useFormik} from "formik";
import * as yup from "yup";
import {useUser} from "../../../../contextApi/useUserData";
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import Calendar from "../../../../atoms/calendar/Calendar";
import ReactSlick from "../../../../atoms/reactSlick/ReactSlick";
import {formatCurrency} from "../../../../helpers/vendors";
import {useServiceData} from "../../../../hooks/useServiceData";
import {useBookingHandler} from "../../../../hooks/useBookingHandler";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface SingleServicePageProps {}

const SingleServicePage: FunctionComponent<SingleServicePageProps> = () => {
	const {vendorId = ""} = useParams<{vendorId: string}>();
	const navigate = useNavigate();
	const theme = useTheme();
	const {user} = useUser();
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [isDateAvailable, setIsDateAvailable] = useState<boolean>(true);

	const {bookingState, handleBooking} = useBookingHandler();
	const {service, unavailableDates, visibleServices, loading, error} =
		useServiceData(vendorId);

	const descriptionPoints = service?.description
		? service.description
				.split("-")
				.map((point) => point.trim())
				.filter(Boolean)
		: [];

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
		};
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
			if (!vendorId || !service) return;

			const result = await handleBooking(
				values,
				selectedDate,
				vendorId,
				service.businessName,
			);

			if (result?.success) {
				successToast(
					`تم إرسال الطلب لتاريخ ${selectedDate.toLocaleDateString()} مع الخدمات:\n${values.features
						.map((f) => `${f.featureName} - ${f.price} ₪`)
						.join(", ")}`,
				);
				resetForm();
			}
		},
	});

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "50vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{textAlign: "center", p: 4}}>
				<Typography color='error' variant='h6' gutterBottom>
					Failed to load service data
				</Typography>
				<Button
					variant='contained'
					color='primary'
					onClick={() => window.location.reload()}
				>
					Retry
				</Button>
			</Box>
		);
	}

	if (bookingState.success) {
		return (
			<Box component={"main"}>
				<Box
					sx={{
						textAlign: "center",
						my: 5,
						p: 3,
						borderRadius: 2,
					}}
				>
					<Typography variant='h4' color='primary'>
						تم إرسال طلبك بنجاح!
					</Typography>
					<Typography variant='body1' sx={{mb: 3}}>
						سيتم التواصل معك قريبًا لتأكيد الطلب.
					</Typography>
					<Button
						variant='contained'
						color='primary'
						size='large'
						onClick={() => navigate("/")}
					>
						العودة إلى الصفحة الرئيسية
					</Button>

					<Button
						variant='contained'
						color='primary'
						sx={{
							display: "block",
							margin: "auto",
							mt: 3,
						}}
						size='large'
						onClick={() => navigate("/my-bookings")}
					>
						رؤيه الطلبات التي طلبتها
					</Button>
				</Box>
			</Box>
		);
	}

	return (
		<Box
			sx={{maxWidth: 1200, mx: "auto", p: {xs: 2, md: 3, fontFamily: "monospace"}}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<h1 className='text-center mb-4'>{service?.businessName}</h1>
				{vendorId && <img src='/special.png' alt='' />}
			</Box>

			<Typography color='textSecondary' variant='h6' align='center' className='mb-3'>
				<LocationOnIcon fontSize='large' color='primary' sx={{mr: 1}} />
				{service?.address?.city}, {service?.address?.street}
			</Typography>
			<Typography color='textSecondary' variant='h6' align='center' className='mb-3'>
				{service?.address?.city}, {service?.address?.street}
			</Typography>

			<Typography
				variant='h4'
				sx={{
					"&:after": {
						content: '""',
						display: "block",
						width: "70%",
						height: 4,
						backgroundColor: theme.palette.warning.main,
						margin: "20px auto",
						borderRadius: 2,
					},
				}}
			/>
			<ReactSlick images={service?.images as any} />
			<Box
				sx={{
					backgroundColor: "#ffffffeb",
					fontFamily: "monospace",
					borderRadius: 5,
					p: 3,
					my: 5,
					boxShadow: 1,
					transition: "all 0.3s ease",
					"&:hover": {
						boxShadow: 3,
						backgroundColor: "#fffffff2",
					},
				}}
			>
				<Box
					component='ul'
					sx={{
						listStyleType: "none",
						padding: 0,
						margin: 0,
						counterReset: "list-counter",
					}}
				>
					{descriptionPoints.map((point, index) => (
						<Box
							component='li'
							key={index}
							sx={{
								marginBottom: "0.75em",
								display: "flex",
								alignItems: "flex-start",
								"&:before": {
									content: '"▹"',
									color: "primary.main",
									mr: 1.5,
									fontSize: "0.9em",
									lineHeight: 1.5,
								},
							}}
						>
							<Typography
								variant='body1'
								sx={{
									lineHeight: 1.6,
									fontFamily: "monospace",
									fontSize: {xs: "0.875rem", sm: "1rem"},
									flex: 1,
								}}
							>
								{point}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>

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

			<Box
				component='form'
				onSubmit={formik.handleSubmit}
				sx={{
					mt: 4,
					p: 3,
					backgroundColor: "background.paper",
					borderRadius: 2,
					boxShadow: 1,
				}}
			>
				<Typography variant='h5' align='center' gutterBottom>
					اختر الخدمات المطلوبة
				</Typography>
				<Typography variant='h5' align='center' gutterBottom>
					{service.email}
				</Typography>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr"},
						gap: 2,
						mb: 3,
					}}
				>
					{visibleServices.length > 0 ? (
						visibleServices.map((item, index) => (
							<FormControlLabel
								key={item.id || index}
								control={
									<Checkbox
										checked={formik.values.features.some(
											(f) => f.featureName === item.featureName,
										)}
										onChange={() => handleFeatureToggle(item)}
										color='primary'
									/>
								}
								label={
									<Typography variant='body1' color='text.primary'>
										{item.featureName} - {formatCurrency(item.price)}
									</Typography>
								}
								sx={{
									textAlign: "right",
									mx: {xs: 0, sm: 1},
								}}
							/>
						))
					) : (
						<Typography
							variant='body2'
							color='text.secondary'
							sx={{gridColumn: "1 / -1", textAlign: "center"}}
						>
							لا توجد خدمات إضافية متاحة.
						</Typography>
					)}
				</Box>

				<TextField
					fullWidth
					name='note'
					label='ملاحظات إضافية (اختياري)'
					multiline
					rows={4}
					value={formik.values.note}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.note && Boolean(formik.errors.note)}
					helperText={formik.touched.note && formik.errors.note}
					sx={{mb: 3}}
				/>

				<Box sx={{textAlign: "center"}}>
					<Button
						disabled={!(formik.isValid && formik.dirty && isDateAvailable)}
						type='submit'
						variant='contained'
						color='primary'
						size='large'
						sx={{px: 6}}
					>
						احجز الآن
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default SingleServicePage;
