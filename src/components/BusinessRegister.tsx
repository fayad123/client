import {useFormik} from "formik";
import {FunctionComponent} from "react";
import {useNavigate} from "react-router-dom";
import {BusinessUserSchema} from "../interfaces/userSchema";
import * as Yup from "yup";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import {mainMenu} from "../routes/mainMenu";
import {theme} from "../App";
import {newBusinessRegisterUser} from "../services/usersServices";
import {successToast} from "../atoms/notifications/Toasts";

interface BusinessRegisterProps {}

const BusinessRegister: FunctionComponent<BusinessRegisterProps> = () => {
	const navigate = useNavigate();

	const formik = useFormik<BusinessUserSchema>({
		initialValues: {
			businessName: "",
			email: "",
			password: "",
			phone: "",
			address: {
				city: "",
				street: "",
			},
			category: "",
		},
		validationSchema: Yup.object({
			businessName: Yup.string().required("الرجاء إدخال الاسم"),
			phone: Yup.string().required("الرجاء إدخال رقم الهاتف"),
			email: Yup.string()
				.email("البريد الإلكتروني غير صالح")
				.required("الرجاء إدخال البريد الإلكتروني"),
			password: Yup.string()
				.min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل")
				.required("الرجاء إدخال كلمة المرور"),
			address: Yup.object({
				city: Yup.string().required("الرجاء إدخال المدينة"),
				street: Yup.string().required("الرجاء إدخال الشارع"),
			}),
			category: Yup.string().required("الرجاء ادخال الفئة"),
		}),

		onSubmit: (values) => {
			console.log(values);
			newBusinessRegisterUser(values).then((userData) => {
				localStorage.setItem("token", userData);
				navigate("/");
				successToast("مرحبا بك في منصه افراحنا");
			});
		},
	});

	return (
		<main
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Box
				component='form'
				onSubmit={formik.handleSubmit}
				sx={{
					padding: 3,
					borderRadius: 2,
					display: "flex",
					flexDirection: "column",
					gap: 2,
					maxWidth: "600px",
				}}
			>
				<Typography
					variant='h4'
					align='center'
					gutterBottom
					sx={{
						fontWeight: "bold",
						paddingTop: "60px",
					}}
				>
					سجل الآن واحصل على خدماتنا المميزة
				</Typography>

				<Typography
					variant='h6'
					align='center'
					gutterBottom
					sx={{color: "#555", fontWeight: "normal", mt: -1}}
				>
					انضم الان إلى موقعنا واستمتع بخدمات مخصصة لحفلات الزفاف والمناسبات
					الخاصة
				</Typography>
				<div className='row row-cols-md-2 py-2'>
					<div className=' mb-3'>
						<TextField
							label='الاسم المتجر / الشركة'
							name='businessName'
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
							variant='filled'
							fullWidth
						/>
					</div>
					<div className=' mb-3'>
						<TextField
							label='البريد الإلكتروني'
							name='email'
							type='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							variant='filled'
							fullWidth
						/>
					</div>
					<div>
						<TextField
							label='كلمة المرور'
							name='password'
							type='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.password && Boolean(formik.errors.password)
							}
							helperText={formik.touched.password && formik.errors.password}
							variant='filled'
							fullWidth
						/>
					</div>
					<div className=' mb-3'>
						<TextField
							label='رقم الهاتف'
							name='phone'
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.phone && Boolean(formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}
							variant='filled'
							fullWidth
						/>
					</div>
					<div>
						<TextField
							label='المدينة'
							name='address.city'
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
							variant='filled'
							fullWidth
						/>
					</div>
					<div className=' mb-3'>
						<TextField
							label='الشارع'
							name='address.street'
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
							variant='filled'
							fullWidth
						/>
					</div>

					{/*  */}
					<div>
						<FormControl
							fullWidth
							variant='filled'
							error={
								formik.touched.category && Boolean(formik.errors.category)
							}
						>
							<InputLabel>الفئة</InputLabel>
							<Select
								label='الفئة'
								name='category'
								value={formik.values.category}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								variant='filled'
							>
								{mainMenu.map((category, index) => (
									<MenuItem key={index} value={category.label}>
										<ListItemIcon>{category.icon}</ListItemIcon>
										<ListItemText primary={category.label} />
									</MenuItem>
								))}
							</Select>
							{formik.touched.category && formik.errors.category && (
								<div style={{color: "red", fontSize: "12px"}}>
									{formik.errors.category}
								</div>
							)}
						</FormControl>
					</div>
				</div>
				<Button type='submit' variant='contained' fullWidth>
					تسجيل
				</Button>
			</Box>
		</main>
	);
};

export default BusinessRegister;
