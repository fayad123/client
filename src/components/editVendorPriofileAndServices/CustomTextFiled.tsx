import {FormHelperText, TextField} from "@mui/material";
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
	// handle nested field paths (e.g., 'price.min' or 'address.city')
	const getNestedValue = (obj: any, path: string) => {
		return  path.split(".").reduce((o, p) => (o || {})[p], obj);
	};

	const value = getNestedValue(formik.values, name) || "";
	const touched = getNestedValue(formik.touched, name);
	const error = getNestedValue(formik.errors, name);

	return (
		<>
			<TextField
				fullWidth
				label={label}
				name={name}
				type={type}
				variant='outlined'
				value={value}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={Boolean(touched && error)}
				sx={{textAlign: "right"}}
			/>
			{touched && error && (
				<FormHelperText error sx={{textAlign: "right"}}>
					{error}
				</FormHelperText>
			)}
		</>
	);
};
export default CustomTextFiled;
