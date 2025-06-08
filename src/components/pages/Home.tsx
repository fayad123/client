import {FunctionComponent, useEffect, useState} from "react";
import {Box, Typography, CardContent, CardActionArea, Card} from "@mui/material";

import {Link} from "react-router-dom";
import {mainMenu} from "../../config/mainMenu";
import {useUser} from "../../contextApi/useUserData";
import {JwtPayload} from "../../interfaces/userSchema";
import {jwtDecode} from "jwt-decode";
import TestimonialsSlider from "./TestimonialsSlider";
import FAQPage from "../settings/FAQPage";
import RecommendedServices from "../serviceView/RecommendedVendors";
import VideoUpload from "../../atoms/Ads/VideoUpload";
import VideoAds from "../../atoms/Ads/VideoAds";
import {getAdsVideos} from "../../services/videosForAds";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import JsonLd from "../JsonLd";
import {generateCategoriesItemListJsonLd} from "../../utils/structuredData";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HomeProps {}

const api = `${import.meta.env.VITE_API_URI}/videos`;

const Home: FunctionComponent<HomeProps> = () => {
	const {user, setUser} = useUser();
	const [videos, setVideos] = useState<string[]>([]);

	useEffect(() => {
		const fetchVideos = async () => {
			const videos = await getAdsVideos();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
	}, [setUser]);

	return (
		<>
			<title>الرئيسية | افراحنا</title>
			<Box component={"main"}>
				<Box>
					{mainMenu.length > 0 && (
						<JsonLd data={generateCategoriesItemListJsonLd(mainMenu)} />
					)}

					<h1 className='display-2 pt-3 fw-bold text-primary text-center mb-3'>
						منـصة أفراحـنـا
					</h1>
					<HorizontalDevider />
					<Typography
						color='white'
						fontSize={"2rem"}
						variant='h2'
						align='center'
						gutterBottom
					>
						لدينا جميع الخدمات التي تحتاجها ليوم الزفاف
					</Typography>
				</Box>
				<Box sx={{maxWidth: "70%", textAlign: "center", margin: "auto"}}>
					{user && user.role === "admin" && <VideoUpload />}
					<VideoAds videos={videos} />
				</Box>

				<Box sx={{overflowY: "auto"}}>
					<RecommendedServices />
				</Box>

				<div className='container'>
					<Typography variant='h2' align='center' gutterBottom color='primary'>
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
										"&:hover": {
											transform: "translateY(-8px)",
											boxShadow: 8,
										},
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
		</>
	);
};

export default Home;
