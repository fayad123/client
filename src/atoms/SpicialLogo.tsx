import { Box, Typography } from '@mui/material';

export default function SpicialLogo() {
  return (
		<Box
			sx={{
				width: 100,
				margin: "auto",
				marginBottom: 1,
			}}
		>
			<img
				style={{
					width: 60,
					marginBottom: 5,
				}}
				src='/special.png'
				alt='متميز'
			/>
			<Typography
				sx={{
					color: "#99830C",
					fontWeight: "bold",
					fontSize: "1.2rem",
					borderTop: 1,
					width: "100%",
					borderColor: "#C1A113",
					borderRadius: "100%",
				}}
			>
				متميز
			</Typography>
		</Box>
  );
}
