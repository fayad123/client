import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {TransitionProps} from "@mui/material/transitions";
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {errorToast, successToast} from "./notifications/Toasts";
import {forwardRef, FunctionComponent, ReactElement, Ref} from "react";
import {addVendorPicture} from "../services/vendorsServices";

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<any, any>;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction='right' ref={ref} {...props} />;
});

interface AddNewPictureProps {
	handleClose: () => void;
	open: boolean;
	userId: string;
	refresh: () => void;
}

const AddNewPicture: FunctionComponent<AddNewPictureProps> = ({
	handleClose,
	open,
	userId,
	refresh,
}) => {
	const formik = useFormik({
		initialValues: {
			image: {
				url: "",
				alt: "",
			},
		},
		validationSchema: yup.object({
			image: yup.object({
				url: yup
					.string()
					.url("الرجاء إدخال رابط صالح")
					.required("الرجاء إدخال إدخال رابط"),
				alt: yup.string().required("الرجاء إدخال عنوان الصورة"),
			}),
		}),
		onSubmit: (values) => {
			addVendorPicture(userId, values.image)
				.then(() => {
					successToast(`تمت إضافة الخدمة "${values.image}" بنجاح`); // Show specific value
					handleClose();
					formik.resetForm();
					refresh();
				})
				.catch((err) => {
					errorToast(err.message || "حدث خطأ أثناء إضافة الصورة");
				});
		},
	});

	return (
		<Dialog
			dir='rtl'
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby='alert-dialog-slide-description'
		>
			<DialogTitle>{"خدمة جديدة"}</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						ادخل عنوان الصورة
					</DialogContentText>
					<TextField
						fullWidth
						autoFocus
						label='رابط الصورة'
						name='image.url'
						variant='outlined'
						value={formik.values.image.url}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.image?.url && Boolean(formik.errors.image?.url)
						}
						helperText={formik.touched.image?.url && formik.errors.image?.url}
						sx={{
							textAlign: "right",
						}}
					/>
					<TextField
						fullWidth
						autoFocus
						label='عنوان الصورة'
						name='image.alt'
						variant='outlined'
						value={formik.values.image.alt}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.image?.alt && Boolean(formik.errors.image?.alt)
						}
						helperText={formik.touched.image?.alt && formik.errors.image?.alt}
						sx={{
							textAlign: "right",
							mt: 5,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>إغلاق</Button>
					<Button
						type='submit'
						variant='contained'
						disabled={formik.isSubmitting}
					>
						{formik.isSubmitting ? "جاري الإضافة..." : "إضافة"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddNewPicture;
