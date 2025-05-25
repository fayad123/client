import {FunctionComponent, useEffect} from "react";
import {Box, Typography, CardContent, CardActionArea, Card} from "@mui/material";

import {Link} from "react-router-dom";
import {mainMenu} from "../routes/mainMenu";
import {useUser} from "../contextApi/useUserData";
import {JwtPayload} from "../interfaces/userSchema";
import {jwtDecode} from "jwt-decode";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const {setUser} = useUser();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode<JwtPayload>(token);
				setUser(decoded);
			} catch (err) {
				console.error("Invalid token", err);
				localStorage.removeItem("token");
			}
		}
	}, []);

	return (
		<main >
			<Typography variant='h3' align='center' gutterBottom color='primary'>
				موقع أفراحنا
			</Typography>
			<Typography
				variant='h5'
				align='center'
				gutterBottom
				sx={{color: "#5d4037", mb: 4}}
			>
				لدينا جميع الخدمات التي تحتاجها ليوم فرحك
			</Typography>
			<div className='container'>
				<div className='row row-cols-1 row-cols-4  row-cols-lg-6 '>
					{mainMenu.map((cat) => (
						<div className='my-2  text-center' key={cat.label}>
							<Card
								sx={{
									textAlign: "center",
									borderRadius: 4,
									boxShadow: 5,
									height:"100%",
									transition: "transform 0.3s",
									"&:hover": {transform: "scale(1.05)"},
								}}
							>
								<Link to={cat.link} style={{textDecoration: "none"}}>
									<CardActionArea>
										<Box
											pt={3}
											display='flex'
											justifyContent='center'
										>
											{typeof cat.icon === "string" ? (
												<Box
													component='img'
													src={cat.icon}
													alt={cat.label}
													sx={{
														objectFit: "cover",
													}}
												/>
											) : (
												cat.icon
											)}
										</Box>
										<CardContent>
											<Typography
												variant='subtitle1'
												fontWeight='bold'
												color='text.primary'
											>
												{cat.label}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default Home;
