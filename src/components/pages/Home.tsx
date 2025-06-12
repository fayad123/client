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
import useAppTheme from "../../atoms/Theme";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const {user, setUser} = useUser();
	const [videos, setVideos] = useState<string[]>([]);
	const api = `${import.meta.env.VITE_API_URI}/videos`;

	useEffect(() => {
		const fetchVideos = async () => {
			const videos = await getAdsVideos();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const urls = videos.map((v: any) => `${api}/${v._id}`);
			setVideos(urls);
		};
		fetchVideos();
	}, [api]);

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
			<Box
				component={"main"}
				// sx={{
				// 	backgroundColor: theme.palette.background.default,
				// 	color: theme.palette.text.primary,
				// 	py: 4,
				// }}
			>
				<Box>
					{mainMenu.length > 0 && (
						<JsonLd data={generateCategoriesItemListJsonLd(mainMenu)} />
					)}

					<Typography
						variant='h1'
						sx={{
							color: "primary.main",
							fontSize: "4rem",
							textAlign: "center",
						}}
					>
						منـصة أفراحـنـا
					</Typography>
					<HorizontalDevider />
					<Typography
						color='white'
						fontSize={"2rem"}
						variant='h2'
						align='center'
						gutterBottom
						sx={{color: "primary.main", fontSize: "2rem"}}
					>
						لدينا جميع الخدمات التي تحتاجها ليوم الزفاف
					</Typography>
				</Box>
				<Box sx={{maxWidth: "70%", textAlign: "center", margin: "auto"}}>
					{user && user.role === "admin" && <VideoUpload />}
				</Box>

				<VideoAds videos={videos} />

				<Box sx={{overflowY: "auto"}}>
					<RecommendedServices />
				</Box>

				<div className='container'>
					<Typography
						variant='h4'
						align='center'
						gutterBottom
						sx={{
							textAlign: "center",
							fontWeight: "bold",
							color: "primary.main",
							mt: 10,
						}}
					>
						خدمـات منـصة أفراحـنـا
					</Typography>
					<HorizontalDevider />
					<Box className='row row-cols-1 row-cols-2  row-cols-lg-6 '>
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
													sx={{color: "primary.dark"}}
												>
													{cat.label}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Link>
								</Card>
							</div>
						))}
					</Box>
				</div>
				{/* FAQ */}
				<FAQPage />
				<TestimonialsSlider />
			</Box>
		</>
	);
};

export default Home;
