import {useFormik} from "formik";
import {FunctionComponent} from "react";
import {LoginSchema} from "../../interfaces/userSchema";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {Button, Box, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {userLogin} from "../../services/usersServices";
import {errorToast, successToast} from "../../atoms/notifications/Toasts";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const navigate = useNavigate();

	const formik = useFormik<LoginSchema>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("الرجاء إدخال البريد الإلكتروني"),
			password: Yup.string().required("الرجاء إدخال كلمة المرور"),
		}),
		onSubmit: async (values, {setSubmitting}) => {
			try {
				const token = await userLogin(values);
				localStorage.setItem("token", token);
				successToast("مرحبا بك في منصة أفراحنا");
				navigate("/");
			} catch (error: any) {
				const message =
					error?.response?.data?.message || "حدث خطأ اثناء تسجيل الدخول";
				errorToast(message);
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<main
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Box
				noValidate
				component='form'
				onSubmit={formik.handleSubmit}
				sx={{
					padding: 3,
					borderRadius: 2,
					display: "flex",
					flexDirection: "column",
					gap: 2,
					maxWidth: "400px",
					direction: "rtl",
					color: "primary.main",
				}}
			>
				<Typography
					variant='h4'
					align='center'
					gutterBottom
					sx={{
						fontWeight: "bold",
						paddingTop: "60px",
						color: "primary.main",
					}}
				>
					سجل الآن واحصل على خدماتنا المميزة
				</Typography>
				<Typography
					variant='h6'
					align='center'
					gutterBottom
					sx={{color: "warning.main", fontWeight: "normal", mt: -1}}
				>
					انضم الان إلى موقعنا واستمتع بخدمات المخصصة لحفلات الزفاف والمناسبات
					الخاصة
				</Typography>
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
				/>
				<TextField
					label='كلمة المرور'
					name='password'
					type='password'
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
					variant='filled'
				/>
				<Button
					sx={{backgroundColor: "primary.main"}}
					type='submit'
					variant='contained'
				>
					تسجيل الدخول
				</Button>
				<Button
					sx={{backgroundColor: "primary.main"}}
					onClick={() => navigate("/register")}
					variant='contained'
				>
					مستخدم جديد
				</Button>
				<Button
					sx={{backgroundColor: "primary.main"}}
					onClick={() => navigate("/business-register")}
					variant='contained'
				>
					بائع جديد
				</Button>
				<Box display='flex' justifyContent='center' gap={2}>
					<Typography sx={{color: "warning.main"}} variant='body2'>
						<Link to='/privacy-policy'>سياسة الخصوصية</Link>
					</Typography>
					<Typography sx={{color: "warning.main"}} variant='body2'>
						|
					</Typography>
					<Typography sx={{color: "warning.main"}} variant='body2'>
						<Link to='/terms-of-use'>شروط الاستخدام</Link>
					</Typography>
				</Box>
			</Box>
		</main>
	);
};

export default Login;
