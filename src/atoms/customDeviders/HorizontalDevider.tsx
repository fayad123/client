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
					width: "100%",
					height: 10,
					backgroundColor: theme.palette.warning.main,
					margin: "20px auto",
				},
			}}
		/>
	);
}
