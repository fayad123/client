import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
		<Box
			component={"main"}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Box>
  );
}
