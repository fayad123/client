import {FunctionComponent} from "react";
import {
	Box,
	Typography,
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
} from "@mui/material";
import {Face} from "@mui/icons-material";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
	return (
		<main>
			<Box p={4}>
				<Typography variant='h2' align='center' gutterBottom>
					من نحن
				</Typography>
				<Container>
					<Typography sx={{lineHeight: 2}} variant='h5' gutterBottom>
						في "أفراحنا"، نؤمن أن يوم الزفاف لا يتكرر، لذا نسعى جاهدين لجعل كل
						لحظة فيه استثنائية. نحن شركة متخصصة في تقديم باقة متكاملة من خدمات
						الأعراس — من تأجير المعدات، التصوير الاحترافي، تنسيق القاعات، وحتى
						تقديم أشهى المأكولات.
					</Typography>
					<Typography sx={{lineHeight: 2}} variant='h5' gutterBottom>
						نحن لا نقدّم خدمات فقط، بل نصنع ذكريات. هدفنا أن نحول حلمك إلى
						حقيقة، وأن يكون يوم زفافك تجربة لا تُنسى، مليئة بالتفاصيل الدقيقة،
						الجودة العالية، واللمسة الإبداعية التي تميزنا.
					</Typography>
					<Typography pt={20} variant='h4' gutterBottom>
						فريقنا خلف الكواليس
					</Typography>
					<Grid container spacing={3} justifyContent='center'>
						<Grid component={"div"}>
							<Card
								sx={{textAlign: "center", borderRadius: 3, boxShadow: 3}}
							>
								<CardMedia>
									<Face
										sx={{
											fontSize: 60,
											color: "#3f51b5",
											marginTop: 2,
										}}
									/>
								</CardMedia>
								<CardContent>
									<Typography variant='h5'>سارة محاجنة</Typography>
									<Typography variant='body2'>مديرة التسويق</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid component={"div"}>
							<Card
								sx={{textAlign: "center", borderRadius: 3, boxShadow: 3}}
							>
								<CardMedia>
									<Face
										sx={{
											fontSize: 60,
											color: "#3f51b5",
											marginTop: 2,
										}}
									/>
								</CardMedia>
								<CardContent>
									<Typography variant='h5'>انيس محاميد</Typography>
									<Typography variant='body2'>مبرمج الشركة</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid component={"div"}>
							<Card
								sx={{textAlign: "center", borderRadius: 3, boxShadow: 3}}
							>
								<CardMedia>
									<Face
										sx={{
											fontSize: 60,
											color: "#3f51b5",
											marginTop: 2,
										}}
									/>
								</CardMedia>
								<CardContent>
									<Typography variant='h5'>فياض محاميد</Typography>
									<Typography variant='body2'>مؤسس الشركة</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid component={"div"}>
							<Card
								sx={{textAlign: "center", borderRadius: 3, boxShadow: 3}}
							>
								<CardMedia>
									<Face
										sx={{
											fontSize: 60,
											color: "#3f51b5",
											marginTop: 2,
										}}
									/>
								</CardMedia>
								<CardContent>
									<Typography variant='h5'>نور اغبارية</Typography>
									<Typography variant='body2'>منسقة حفلات</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</main>
	);
};

export default About;
