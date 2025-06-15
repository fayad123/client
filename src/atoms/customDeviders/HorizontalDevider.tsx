import {Typography} from "@mui/material";

const horizontalDevider = () => {
	return (
		<Typography
			variant='h4'
			sx={{
				"&:after": {
					content: '""',
					display: "block",
					width: "100%",
					height: 20,
					backgroundColor: "warning.main",
					margin: "20px auto",
				},
			}}
		/>
	);
};
export default horizontalDevider;
