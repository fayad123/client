import * as React from "react";
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
import {addVendorService} from "../services/vendorServices";
import {errorToast, successToast} from "./notifications/Toasts";
import {forwardRef, FunctionComponent, ReactElement, Ref} from "react";

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<any, any>;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction='right' ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
	handleClose: () => void;
	open: boolean;
	userId: string;
	refresh: () => void;
}

const AlertDialogSlide: FunctionComponent<AlertDialogSlideProps> = ({
	handleClose,
	open,
	userId,
	refresh,
}) => {
	const formik = useFormik({
		initialValues: {
			featureName: "",
			price: 0,
		},
		validationSchema: yup.object({
			featureName: yup.string().required("الخدمة مطلوبة"), // Changed from newService
			price: yup.number().required("سعر الخدمة مطلوب").positive(),
		}),
		onSubmit: (values) => {
			addVendorService(userId, {
				featureName: values.featureName,
				price: values.price,
			})
				.then(() => {
					successToast(`تمت إضافة الخدمة "${values.featureName}" بنجاح`); // Show specific value
					handleClose();
					formik.resetForm();
					refresh();
				})
				.catch((err) => {
					errorToast(err.message || "حدث خطأ أثناء إضافة الخدمة");
				});
		},
	});

	return (
		<Dialog
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
						ما هي الخدمة الجديدة التي تريد إضافتها؟
					</DialogContentText>
					<TextField
						fullWidth
						autoFocus
						label='الخدمة الجديدة'
						name='featureName'
						variant='outlined'
						value={formik.values.featureName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.featureName &&
							Boolean(formik.errors.featureName)
						}
						helperText={
							formik.touched.featureName && formik.errors.featureName
						}
						sx={{
							textAlign: "right",
						}}
					/>
					<TextField
						fullWidth
						label='سعر الخدمة'
						name='price'
						type='number'
						variant='outlined'
						value={formik.values.price}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.price && Boolean(formik.errors.price)}
						helperText={formik.touched.price && formik.errors.price}
						sx={{textAlign: "right", mt: 2}}
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

export default AlertDialogSlide;
