import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {FunctionComponent} from "react";

const Pnf: FunctionComponent = () => {
	const navigate = useNavigate();

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			minHeight='100vh'
			textAlign='center'
			px={2}
		>
			<Typography variant='h1' color='primary' fontWeight={700}>
				404
			</Typography>
			<Typography variant='h4' gutterBottom>
				الصفحة غير موجودة
			</Typography>
			<Typography variant='body1' mb={3}>
				عذرًا، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.
			</Typography>
			<Button variant='contained' color='primary' onClick={() => navigate("/")}>
				الرجوع إلى الصفحة الرئيسية
			</Button>
		</Box>
	);
};

export default Pnf;
