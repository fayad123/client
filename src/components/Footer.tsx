import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
	return (
		<Box
			component='footer'
			sx={{
				backgroundColor: "#915200",
				color: "white",
				textAlign: "center",
				py: 2,
				mt: 5,
			}}
		>
			<Typography variant='body1'>© جميع الحقوق محفوظة - موقع أفراحنا</Typography>
		</Box>
	);
};

export default Footer;
