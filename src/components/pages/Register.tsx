import {useFormik} from "formik";
import {FunctionComponent} from "react";
import {UserSchema} from "../../interfaces/userSchema";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

import {
	Button,
	Box,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Typography,
} from "@mui/material";
import {theme} from "../../App";
import {registerNewUser} from "../../services/usersServices";
import {useNavigate} from "react-router-dom";
import {successToast} from "../../atoms/notifications/Toasts";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();

	const formik = useFormik<UserSchema>({
		initialValues: {
			name: {
				first: "",
				last: "",
			},
			email: "",
			password: "",
			phone: "",
			address: {
				city: "",
				street: "",
			},
		},
		validationSchema: Yup.object({
			name: Yup.object({
				first: Yup.string().required("الرجاء إدخال الاسم الأول"),
				last: Yup.string().required("الرجاء إدخال الاسم الأخير"),
			}),
			email: Yup.string()
				.email("البريد الإلكتروني غير صالح")
				.required("الرجاء إدخال البريد الإلكتروني"),
			password: Yup.string()
				.min(8, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل")
				.required("الرجاء إدخال كلمة المرور"),
			phone: Yup.string().required("الرجاء إدخال رقم الهاتف"),
			address: Yup.object({
				city: Yup.string().required("الرجاء إدخال المدينة"),
				street: Yup.string().required("الرجاء إدخال الشارع"),
			}),
		}),

		onSubmit: (values) => {
			console.log(values);
			registerNewUser(values).then((userData) => {
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
							label='الاسم الأول'
							name='name.first'
							value={formik.values.name.first}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.name?.first &&
								Boolean(formik.errors.name?.first)
							}
							helperText={
								formik.touched.name?.first && formik.errors.name?.first
							}
							variant='filled'
							fullWidth
						/>
					</div>
					<div>
						<TextField
							label='الاسم الأخير'
							name='name.last'
							value={formik.values.name.last}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.name?.last &&
								Boolean(formik.errors.name?.last)
							}
							helperText={
								formik.touched.name?.last && formik.errors.name?.last
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
				</div>
				<Button type='submit' variant='contained' fullWidth>
					تسجيل
				</Button>
			</Box>
		</main>
	);
};

export default Register;
