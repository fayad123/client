import {TextField} from "@mui/material";
import {FormikValues} from "formik";
import {FunctionComponent} from "react";

interface CustomTextFiledProps {
	formik: FormikValues;
	name: string;
	label: string;
	type?: string;
}

const CustomTextFiled: FunctionComponent<CustomTextFiledProps> = ({
	formik,
	name,
	label,
	type = "text",
}) => {
	return (
		<TextField
			fullWidth
			label={label}
			name={name}
			type={type}
			variant='outlined'
			value={formik.values[name]}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			error={formik.touched[name] && Boolean(formik.errors[name])}
			helperText={formik.touched[name] && formik.errors[name]}
			sx={{textAlign: "right"}}
		/>
	);
};
export default CustomTextFiled;
