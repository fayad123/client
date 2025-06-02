import { Typography } from '@mui/material';
import { theme } from '../../App';

export default function VarticalDevider() {
  return (
		<Typography
			sx={{
				"&:after": {
					content: '""',
					display: "block",
					width: 4,
					height: 100,
					backgroundColor: theme.palette.primary.main,
					margin: "50px auto",
					borderRadius: 2,
				},
			}}
		/>
  );
}
