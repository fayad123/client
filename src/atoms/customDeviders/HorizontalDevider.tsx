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
					height: 20,
					backgroundColor: theme.palette.warning.main,
					margin: "20px auto",
					borderRadius: "20px 20px 0 0"
					,
				},
			}}
		/>
	);
}
