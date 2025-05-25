import {
	getVendorData,
	removeVendorService,
	updateVendorServices,
} from "../../../services/vendorServices";
import {useUser} from "../../../contextApi/useUserData";
import {FunctionComponent, useState, useEffect} from "react";
import {useFormik} from "formik";
import {Services} from "../../../interfaces/services";
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
	ImageList,
	ImageListItem,
} from "@mui/material";
import {successToast} from "../../../atoms/notifications/Toasts";
import AddIcon from "@mui/icons-material/Add";
import AddNewServiceModal from "../../../atoms/AddNewServiceModal";
import AddNewPicture from "../../../atoms/AddNewPicture";

interface EditServicesProps {}

const EditServices: FunctionComponent<EditServicesProps> = () => {
	const [vendor, setVendor] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [openAddImage, setOpenAddImage] = useState<boolean>(false);
	const {user} = useUser();

	const handleClickOpenAddImage = () => setOpenAddImage(!openAddImage);
	const handleCloseAddImage = () => setOpenAddImage(!openAddImage);

	const handleClickOpen = () => setOpen(!open);
	const handleClose = () => setOpen(!open);

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

	const initialValues =
		vendor.length > 0
			? vendor[0]
			: {
					businessName: "",
					phone: "",
					category: "",
					images: [],
					description: "",
					priceType: "",
					price: {min: 0, max: 0},
					address: {city: "", street: ""},
					availableDates: [],
					services: [],
					vendorId: "",
			  };

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

	const handleRemoveVendorService = async (vid: string, servName: string) => {
		setLoading(true);
		await removeVendorService(vid, servName);
		setLoading(false);
		setRefresh(!refresh);
	};

	return (
		<main className=' container'>
			<Box
				component='form'
				onSubmit={formik.handleSubmit}
				noValidate
				autoComplete='off'
				sx={{
					backdropFilter: "blur(80px)",
					p: 3,
					borderRadius: 2,
					boxShadow: 1,
					mb: 4,
				}}
			>
				<Typography variant='h4' gutterBottom sx={{textAlign: "center", mb: 3}}>
					تعديل بيانات مزود الخدمة
				</Typography>

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
					<TextareaAutosize
						name='description'
						aria-label='الوصف'
						minRows={4}
						maxLength={500}
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{
							marginBlock: 30,
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
				</Box>

				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
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
					sx={{
						borderRadius: 5,
					}}
					startIcon={<AddIcon />}
					onClick={() => handleClickOpenAddImage()}
				/>

				{vendor.length > 0 && (
					<ImageList variant='woven' cols={3} gap={10}>
						{vendor[0].images?.map((item, index) => (
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
				)}
			</Box>

			<Divider sx={{my: 4}} />

			{/* Services Section */}
			<Box
				sx={{
					backdropFilter: "blur(80px)",
					p: 3,
					borderRadius: 2,
					boxShadow: 1,
				}}
			>
				<Typography variant='h5' gutterBottom sx={{textAlign: "center", mb: 3}}>
					الخدمات المتاحة
				</Typography>

				{vendor.length === 0 ? (
					<Typography color='text.secondary'>لا توجد خدمات متاحة</Typography>
				) : (
					<>
						{/* Desktop View */}
						<Box sx={{display: {xs: "none", md: "block"}}}>
							<Box sx={{textAlign: "start", mb: 2}}>
								<Button
									size='small'
									variant='contained'
									sx={{borderRadius: 5}}
									startIcon={<AddIcon />}
									onClick={handleClickOpen}
								/>
							</Box>
							<table className='table fw-bold table-striped text-end table-bordered'>
								<thead>
									<tr>
										<th>الاسم التجاري</th>
										<th>الخدمات</th>
										<th>نطاق الأسعار</th>
									</tr>
								</thead>
								<tbody>
									{vendor.map((vendorItem, index) => (
										<tr key={index}>
											<td>{vendorItem.businessName}</td>
											<td>
												{vendorItem.services?.length > 0 ? (
													<ul
														style={{
															listStyleType: "none",
															paddingRight: 0,
														}}
													>
														{vendorItem.services.map(
															(service, i) => (
																<li key={i}>
																	<div className=' d-flex  align-items-center'>
																		<Button
																			color='error'
																			size='small'
																			onClick={() =>
																				handleRemoveVendorService(
																					vendorItem.vendorId,
																					service.featureName,
																				)
																			}
																		>
																			حذف
																		</Button>
																		-{" "}
																		{service.featureName ||
																			"Unnamed Service"}{" "}
																		{service.price &&
																			` (${service.price.toLocaleString(
																				"he-IL",
																				{
																					currency:
																						"ILS",
																					style: "currency",
																					minimumFractionDigits: 0,
																					maximumFractionDigits: 0,
																				},
																			)})`}
																	</div>
																</li>
															),
														)}
													</ul>
												) : (
													<Typography color='text.secondary'>
														لا توجد خدمات
													</Typography>
												)}
											</td>
											<td>
												{vendorItem.priceType === "fixed" ? (
													<span>
														سعر ثابت:{" "}
														{vendorItem.price.min.toLocaleString(
															"he-IL",
															{
																currency: "ILS",
																style: "currency",
																minimumFractionDigits: 0,
																maximumFractionDigits: 0,
															},
														)}
													</span>
												) : (
													<span>
														من{" "}
														{vendorItem.price.min.toLocaleString(
															"he-IL",
															{
																currency: "ILS",
																style: "currency",
																minimumFractionDigits: 0,
																maximumFractionDigits: 0,
															},
														)}{" "}
														إلى{" "}
														{vendorItem.price.max.toLocaleString(
															"he-IL",
															{
																currency: "ILS",
																style: "currency",
															},
														)}
													</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</Box>

						{/* Mobile View */}
						<Box sx={{display: {xs: "block", md: "none"}}}>
							<Box
								sx={{
									textAlign: "start",
									mb: 2,
								}}
							>
								<Button
									size='small'
									variant='contained'
									sx={{
										borderRadius: 5,
									}}
									startIcon={<AddIcon />}
									onClick={handleClickOpen}
								/>
							</Box>

							{vendor.map((vendorItem, index) => (
								<Box
									key={index}
									className='card mb-3 text-end'
									sx={{border: "1px solid #eee", borderRadius: 1}}
								>
									<Box className='card-body' sx={{p: 2}}>
										<Typography
											variant='h6'
											className='card-title'
											sx={{mb: 1, textAlign: "center"}}
										>
											{vendorItem.businessName}
										</Typography>

										<Typography variant='body2' sx={{mb: 1}}>
											<strong>السعر: </strong>
											{vendorItem.priceType === "fixed"
												? `${vendorItem.price.min.toLocaleString(
														"he-IL",
														{
															style: "currency",
															currency: "ILS",
														},
												  )} (ثابت)`
												: `من ${vendorItem.price.min.toLocaleString(
														"he-IL",
														{
															style: "currency",
															currency: "ILS",
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														},
												  )} إلى ${vendorItem.price.max.toLocaleString(
														"he-IL",
														{
															style: "currency",
															currency: "ILS",
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														},
												  )}`}
										</Typography>

										<Divider sx={{my: 1}} />

										<Typography variant='subtitle2' sx={{mb: 1}}>
											الخدمات:
										</Typography>
										{vendorItem.services?.length > 0 ? (
											<ul
												style={{
													listStyleType: "none",
													paddingRight: 0,
													margin: 0,
												}}
											>
												{vendorItem.services.map((service, i) => (
													<li key={service.featureName + i}>
														-{" "}
														{service.featureName ||
															"خدمة بدون اسم"}
														{service.price !== undefined && (
															<span
																style={{
																	marginRight: "8px",
																}}
															>
																(
																{service.price.toLocaleString(
																	"he-IL",
																	{
																		style: "currency",
																		currency: "ILS",
																		minimumFractionDigits: 0,
																		maximumFractionDigits: 0,
																	},
																)}
																)
															</span>
														)}
													</li>
												))}
											</ul>
										) : (
											<Typography
												variant='body2'
												color='text.secondary'
											>
												لا توجد خدمات
											</Typography>
										)}
									</Box>
								</Box>
							))}
						</Box>
					</>
				)}
			</Box>
			<AddNewServiceModal
				userId={user?._id as string}
				handleClose={handleClose}
				open={open}
				refresh={() => setRefresh(!refresh)}
			/>
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
