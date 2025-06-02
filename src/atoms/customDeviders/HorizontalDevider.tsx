import {Typography} from "@mui/material";
import {theme} from "../../App";

export default function horizontalDevider() {
	return (
		<Typography
			variant='h4'
			sx={{
				"&:after": {
					content: '""',
					display: "block",
					width: "70%",
					height: 4,
					backgroundColor: theme.palette.warning.main,
					margin: "20px auto",
					borderRadius: 2,
				},
			}}
		/>
	);
}
