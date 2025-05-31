import {getVendorData, updateVendorServices} from "../../../../services/vendorServices";
import {useUser} from "../../../../contextApi/useUserData";
import {FunctionComponent, useState, useEffect} from "react";
import {useFormik} from "formik";
import {Services, vendorsServicesInitionalData} from "../../../../interfaces/services";
import * as yup from "yup";
import {
	Button,
	TextField,
	Typography,
	Divider,
	CircularProgress,
	Box,
	InputLabel,
	MenuItem,
	Select,
	FormControl,
	FormHelperText,
	TextareaAutosize,
} from "@mui/material";
import {successToast} from "../../../../atoms/notifications/Toasts";
import AddIcon from "@mui/icons-material/Add";
import AddNewPicture from "../../../../atoms/AddNewPicture";
import ReactSlick from "../../../../atoms/reactSlick/ReactSlick";
import ServicesSettings from "./ServicesSettings";
import {JwtPayload} from "../../../../interfaces/userSchema";
import {useNavigate} from "react-router-dom";

interface EditServicesProps {}

const EditServices: FunctionComponent<EditServicesProps> = () => {
	const [vendor, setVendor] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [openAddImage, setOpenAddImage] = useState<boolean>(false);
	const {user} = useUser();
	const navigate = useNavigate();
	const handleClickOpenAddImage = () => setOpenAddImage(!openAddImage);
	const handleCloseAddImage = () => setOpenAddImage(!openAddImage);

	useEffect(() => {
		const fetchVendorData = async () => {
			if (user?._id) {
				try {
					setLoading(true);
					setError(null);
					const data = await getVendorData(user._id);
					setVendor(data);
				} catch (err) {
					setError("فشل في تحميل بيانات مزود الخدمة. يرجى المحاولة مرة أخرى.");
				} finally {
					setLoading(false);
				}
			}
		};

		fetchVendorData();
	}, [user, refresh]);

	const initialValues = vendor.length > 0 ? vendor[0] : vendorsServicesInitionalData;

	const validationSchema = yup.object().shape({
		businessName: yup.string().required("اسم التجاري مطلوب"),
		phone: yup.string().required("رقم الهاتف مطلوب"),
		category: yup.string().required("الفئة مطلوبة"),
		description: yup.string().max(500, "الوصف يجب أن يكون أقل من 500 حرف"),
		priceType: yup.string().required("نوع السعر مطلوب"),
		price: yup.object().shape({
			min: yup
				.number()
				.min(0, "يجب أن يكون السعر موجب")
				.required("السعر الأدنى مطلوب"),
			max: yup
				.number()
				.min(
					yup.ref("min"),
					"السعر الأقصى يجب أن يكون أكبر من أو يساوي السعر الأدنى",
				)
				.required("السعر الأقصى مطلوب"),
		}),
		address: yup.object().shape({
			city: yup.string().required("المدينة مطلوبة"),
			street: yup.string().required("الشارع مطلوب"),
		}),
	});

	const formik = useFormik({
		initialValues,
		enableReinitialize: true,
		validationSchema,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				await updateVendorServices(values.vendorId, values);
				successToast("تم تحديث البيانات بنجاح!");
				setVendor((prevVendors) =>
					prevVendors.map((vendor) =>
						vendor.vendorId === values.vendorId
							? {...vendor, ...values}
							: vendor,
					),
				);
			} catch (err) {
				console.error("Failed to update vendor:", err);
				setError("فشل في تحديث البيانات. يرجى المحاولة مرة أخرى.");
			} finally {
				setLoading(false);
			}
		},
	});

	if (loading && vendor.length === 0) {
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
			<Box
				sx={{
					textAlign: "center",
					p: 4,
				}}
			>
				<Typography color='error'>{error}</Typography>
				<Button
					variant='contained'
					onClick={() => window.location.reload()}
					sx={{mt: 2}}
				>
					إعادة المحاولة
				</Button>
			</Box>
		);
	}

	return (
		<main className=' container'>
			{/* edit section */}
			<Box
				component='form'
				onSubmit={formik.handleSubmit}
				noValidate
				sx={{
					p: 3,
					borderRadius: 2,
					boxShadow: 1,
					mb: 4,
				}}
			>
				<Typography variant='h4' gutterBottom sx={{textAlign: "center", mb: 3}}>
					تعديل بيانات مزود الخدمة
				</Typography>
				<Button
					size='small'
					variant='contained'
					sx={{mb: 2}}
					onClick={() => navigate(`/service/${user?._id}`)}
				>
					صفحتي
				</Button>
				<Box className='row row-cols-1 row-cols-md-2 row-cols-lg-3' sx={{gap: 3}}>
					{/* Business Info Section */}
					<Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
						<TextField
							fullWidth
							label='الاسم التجاري'
							name='businessName'
							variant='outlined'
							value={formik.values.businessName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.businessName &&
								Boolean(formik.errors.businessName)
							}
							helperText={
								formik.touched.businessName && formik.errors.businessName
							}
							sx={{textAlign: "right"}}
						/>
						<TextField
							fullWidth
							label='هاتف'
							name='phone'
							variant='outlined'
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.phone && Boolean(formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}
							sx={{textAlign: "right"}}
						/>
					</Box>

					{/* Address Section */}
					<Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
						<TextField
							fullWidth
							label='المدينة'
							name='address.city'
							variant='outlined'
							value={formik.values.address.city}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.address?.city &&
								Boolean(formik.errors.address?.city)
							}
							helperText={
								formik.touched.address?.city &&
								formik.errors.address?.city
							}
							sx={{textAlign: "right"}}
						/>
						<TextField
							fullWidth
							label='الشارع'
							name='address.street'
							variant='outlined'
							value={formik.values.address.street}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.address?.street &&
								Boolean(formik.errors.address?.street)
							}
							helperText={
								formik.touched.address?.street &&
								formik.errors.address?.street
							}
							sx={{textAlign: "right"}}
						/>
						<TextField
							fullWidth
							label='الفئة'
							name='category'
							variant='outlined'
							value={formik.values.category}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.category && Boolean(formik.errors.category)
							}
							helperText={formik.touched.category && formik.errors.category}
							sx={{textAlign: "right"}}
						/>
					</Box>

					{/* Pricing Section */}
					<Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
						<FormControl
							fullWidth
							error={
								formik.touched.priceType &&
								Boolean(formik.errors.priceType)
							}
						>
							<InputLabel id='priceType-label' sx={{textAlign: "right"}}>
								نوع السعر
							</InputLabel>
							<Select
								labelId='priceType-label'
								id='priceType'
								name='priceType'
								value={formik.values.priceType}
								label='نوع السعر'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								sx={{textAlign: "right"}}
							>
								<MenuItem value='' disabled>
									اختر نوع السعر
								</MenuItem>
								<MenuItem value='fixed'>سعر ثابت</MenuItem>
								<MenuItem value='range'>سعر غير ثابت</MenuItem>
							</Select>
							{formik.touched.priceType && formik.errors.priceType && (
								<FormHelperText sx={{textAlign: "right"}}>
									{formik.errors.priceType}
								</FormHelperText>
							)}
						</FormControl>

						<Box
							sx={{
								display: "flex",
								gap: 2,
							}}
						>
							<TextField
								fullWidth
								label='السعر الأدنى'
								name='price.min'
								type='number'
								variant='outlined'
								value={formik.values.price.min}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.price?.min &&
									Boolean(formik.errors.price?.min)
								}
								helperText={
									formik.touched.price?.min && formik.errors.price?.min
								}
								sx={{textAlign: "right"}}
							/>
							<TextField
								fullWidth
								label='السعر الأقصى'
								name='price.max'
								type='number'
								variant='outlined'
								value={formik.values.price.max}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.price?.max &&
									Boolean(formik.errors.price?.max)
								}
								helperText={
									formik.touched.price?.max && formik.errors.price?.max
								}
								sx={{textAlign: "right"}}
								disabled={formik.values.priceType === "fixed"}
							/>
						</Box>
					</Box>

					{/* details section */}
					<Box
						sx={{
							border: 1,
							borderColor: "divider",
							borderRadius: 2,
							mb: 3,
							p: 2,
							bgcolor: "divider",
						}}
					>
						هنا سيتم عرض بيانات الاشتراك
					</Box>
					<Box
						component='ul'
						sx={{
							bgcolor: "#ffffffeb",
							fontFamily: "monospace",
							borderRadius: 2,
							p: 3,
							my: 3,
							boxShadow: 1,
							transition: "all 0.3s ease",
							listStyle: "none",
							"&:hover": {
								boxShadow: 3,
								bgcolor: "#fffffff2",
							},
							"& li": {
								position: "relative",
								pl: 2,
								mb: 1.5,
								"&:before": {
									content: '""',
									position: "absolute",
									right: 0,
									transform: "translateX(100%)",
									mr: 1,
								},
							},
						}}
					>
						<Typography variant='h6' sx={{fontWeight: "bold", mb: 2}}>
							التعليمات:
						</Typography>
						<Typography component='li' sx={{lineHeight: 1.8}}>
							إذا أردت إضافة سطر جديد، يمكنك إضافة علامة الناقص (-) في أول
							السطر
						</Typography>
						<Typography
							component='li'
							sx={{
								bgcolor: "#F3B63F",
								p: 1.5,
								borderRadius: 1,
								lineHeight: 1.8,
							}}
						>
							-هذا سطر جديد مع علامة الناقص
						</Typography>
					</Box>
					<TextareaAutosize
						name='description'
						aria-label='الوصف'
						minRows={4}
						maxLength={500}
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{
							width: "100%",
							padding: "8px",
							fontFamily: "inherit",
							fontSize: "1rem",
							direction: "rtl",
							borderColor:
								formik.touched.description && formik.errors.description
									? "red"
									: "rgba(0, 0, 0, 0.23)",
							borderRadius: "4px",
						}}
					/>
					<FormHelperText sx={{textAlign: "right"}}>
						{formik.touched.description && formik.errors.description
							? formik.errors.description
							: `عدد الأحرف: ${formik.values.description.length}/500`}
					</FormHelperText>

					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							mt: 3,
						}}
					>
						<Button
							type='submit'
							variant='contained'
							size='large'
							disabled={loading}
							sx={{minWidth: 120}}
						>
							{loading ? <CircularProgress size={24} /> : "حفظ التغييرات"}
						</Button>
					</Box>
				</Box>
			</Box>

			<Divider sx={{my: 4}} />

			{/* Images view */}
			<Box
				sx={{
					backdropFilter: "blur(80px)",
					boxShadow: 1,
					borderRadius: 2,
					p: 3,
				}}
			>
				<Button
					size='small'
					variant='contained'
					sx={{mb: 2}}
					startIcon={<AddIcon />}
					onClick={handleClickOpenAddImage}
				>
					إضافة صورة جديدة
				</Button>

				{vendor.length > 0 && <ReactSlick images={vendor[0].images as any} />}
			</Box>

			<Divider sx={{my: 4}} />

			{/* Services Section */}
			<ServicesSettings user={user as JwtPayload} vendor={vendor} />

			<AddNewPicture
				userId={user?._id as string}
				handleClose={handleCloseAddImage}
				open={openAddImage}
				refresh={() => setRefresh(!refresh)}
			/>
		</main>
	);
};

export default EditServices;
