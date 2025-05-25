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
import { addVendorPicture } from "../services/halsDecoration";


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
			image: "",
		},
		validationSchema: yup.object({
			image: yup
				.string()
				.url("الرجاء إدخال رابط صالح")
				.required("الرجاء إدخال عنوان الصورة"),
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
						label='عنوان الصورة'
						name='image'
						variant='outlined'
						value={formik.values.image}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.image && Boolean(formik.errors.image)}
						helperText={formik.touched.image && formik.errors.image}
						sx={{
							textAlign: "right",
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
