import {FunctionComponent, useEffect, useState} from "react";
import {
	Box,
	Typography,
	CardContent,
	CardActionArea,
	Card,
	Container,
} from "@mui/material";

import {Link} from "react-router-dom";
import {mainMenu} from "../../routes/mainMenu";
import {useUser} from "../../contextApi/useUserData";
import {JwtPayload} from "../../interfaces/userSchema";
import {jwtDecode} from "jwt-decode";
import TestimonialsSlider from "./TestimonialsSlider";
import FAQPage from "./FAQPage";
import RecommendedServices from "./RecommendedVendors";
import {theme} from "../../App";
import VideoUpload from "../../atoms/Ads/VideoUpload";
import VideoAds from "../../atoms/Ads/VideoAds";
import {getAdsVideos} from "../../services/videos";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import VarticalDevider from "../../atoms/customDeviders/VarticalDevider";

interface HomeProps {}

const api = `${import.meta.env.VITE_API_URI}/videos`;

const Home: FunctionComponent<HomeProps> = () => {
	const {setUser} = useUser();
	const [videos, setVideos] = useState<string[]>([]);

	useEffect(() => {
		const fetchVideos = async () => {
			const videos = await getAdsVideos();
			const urls = videos.map((v: any) => `${api}/${v._id}`);
			setVideos(urls);
		};
		fetchVideos();
	}, []);

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
		<Box component={"main"}>
			<Box sx={{my: 5}}>
				<Typography variant='h3' align='center' gutterBottom color='primary'>
					منـصة أفراحـنـا
				</Typography>
				<HorizontalDevider />
				<Typography
					variant='h5'
					align='center'
					gutterBottom
					sx={{color: "#5d4037", mb: 4}}
				>
					لدينا جميع الخدمات التي تحتاجها ليوم الزفاف
				</Typography>
			</Box>
			<Box sx={{maxWidth: "70%", textAlign: "center", margin: "auto"}}>
				<VideoUpload />
				<VideoAds videos={videos} />
			</Box>

			<Box sx={{maxHeight: 800}}>
				<RecommendedServices />
			</Box>
			<div className='container'>
				<Typography
					sx={{mt: 15}}
					variant='h3'
					align='center'
					gutterBottom
					color='primary'
				>
					خدمـات منـصة أفراحـنـا
				</Typography>
				<HorizontalDevider />
				<div className='row row-cols-1 row-cols-2  row-cols-lg-6 '>
					{mainMenu.map((cat) => (
						<div className='my-2  text-center' key={cat.label}>
							<Card
								sx={{
									textAlign: "center",
									borderRadius: 4,
									boxShadow: 1,
									height: "100%",
									transition: "all 0.3s",
									"&:hover": {transform: "translateY(-8px)",boxShadow:8},
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
			{/* FAQ */}
			<FAQPage />
			<TestimonialsSlider />
		</Box>
	);
};

export default Home;
