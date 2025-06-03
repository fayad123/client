import React, {FunctionComponent, useEffect, useState} from "react";
import {
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
	Rating,
	Chip,
	Box,
	Skeleton,
	useTheme,
	useMediaQuery,
	CardActions,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {getRecommendedVendors} from "../../services/recomendedVendors";
import {Services} from "../../interfaces/services";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../helpers/vendors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Essential for basic slider styling
import "slick-carousel/slick/slick-theme.css"; // Essential for default theme (dots, arrows)
import VarticalDevider from "../../atoms/customDeviders/VarticalDevider";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";

interface RecommendedServicesProps {}

const RecommendedServices: FunctionComponent<RecommendedServicesProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState(true);
	const [favorites, setFavorites] = useState<Set<string>>(new Set());
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const settings = {
		infinite: true,
		slidesToScroll: 1,
		slidesToShow: isMobile ? 1 : isTablet ? 2 : 4,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: theme.breakpoints.values.xl,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: theme.breakpoints.values.lg,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: theme.breakpoints.values.md,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: theme.breakpoints.values.xs,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};

	useEffect(() => {
		setLoading(true);
		getRecommendedVendors()
			.then(setServices)
			.catch((err) => {
				console.error("Failed to fetch recommended vendors:", err); // Use console.error for errors
			})
			.finally(() => setLoading(false));
	}, []);

	const toggleFavorite = (serviceId: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			if (newFavorites.has(serviceId)) {
				newFavorites.delete(serviceId);
			} else {
				newFavorites.add(serviceId);
			}
			return newFavorites;
		});
	};

	if (loading) {
		return (
			<Box sx={{p: 4, textAlign: "center"}}>
				<Typography variant='h4' gutterBottom>
					الخدمات الموصى بها
				</Typography>
				<Grid container spacing={3} justifyContent='center'>
					{[...Array(isMobile ? 1 : isTablet ? 2 : 4)].map(
						(
							_,
							index, // Adjust skeleton count
						) => (
							<Grid size={{xs: 12, md: 6}} key={index}>
								<Card sx={{borderRadius: 4, m: 3, height: "100%"}}>
									<Skeleton variant='rectangular' height={180} />
									<CardContent>
										<Skeleton
											variant='text'
											width='80%'
											sx={{mb: 1}}
										/>
										<Skeleton
											variant='text'
											width='60%'
											sx={{mb: 1}}
										/>
										<Skeleton variant='text' width='40%' />
									</CardContent>
									<CardActions sx={{justifyContent: "flex-end", p: 2}}>
										<Skeleton
											variant='circular'
											width={36}
											height={36}
										/>
									</CardActions>
								</Card>
							</Grid>
						),
					)}
				</Grid>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				p: 2,
				my: 4,
				width: "95%",
				margin: "auto",
			}}
		>
			<Typography
				variant='h4'
				gutterBottom
				sx={{
					textAlign: "center",
					fontWeight: "bold",
					color: theme.palette.primary.main,
					mt: 10,
				}}
			>
				الخدمات الموصى بها
			</Typography>
			<VarticalDevider/>
			<HorizontalDevider/>
			{services.length ? (
				<Slider {...settings}>
					{services.map((service, index) => (
						<Box key={service.vendorId} sx={{p: 1}}>
							<Card
								sx={{
									borderRadius: 2,
									boxShadow: 1,
									display: "flex",
									flexDirection: "column",
									height: "100%",
									transition: "transform 0.3s, box-shadow 0.3s",
									"&:hover": {
										transform: "translateY(-5px)",
										boxShadow: 8,
									},
									cursor: "pointer",
								}}
							>
								<Link
									to={`/service/${service.vendorId}`}
									style={{textDecoration: "none"}}
								>
									<Box sx={{position: "relative"}}>
										{service.images && (
											<Box key={service.vendorId + index}>
												<CardMedia
													component='img'
													height='200'
													image={
														Array.isArray(service.images)
															? service.images[0]?.url
															: service.businessName
													}
													alt={service.businessName}
												/>
												<Chip
													label={formatCurrency(
														service.price.min,
													)}
													color='primary'
													sx={{
														position: "absolute",
														top: 16,
														left: 16,
														fontWeight: "bold",
														fontSize: "1rem",
														px: 1.5,
														py: 0.5,
														borderRadius: "8px",
													}}
												/>
											</Box>
										)}

										<Button
											size='small'
											onClick={(e) => {
												e.preventDefault();
												toggleFavorite(service.vendorId);
											}}
											sx={{
												position: "absolute",
												top: 16,
												right: 16,
												minWidth: "auto",
												padding: "6px",
												borderRadius: "50%",
												backgroundColor:
													"rgba(255, 255, 255, 0.9)",
												"&:hover": {
													backgroundColor:
														"rgba(255, 255, 255, 1)",
												},
											}}
										>
											{favorites.has(service.vendorId) ? (
												<FavoriteIcon color='primary' />
											) : (
												<FavoriteBorderIcon color='primary' />
											)}
										</Button>
									</Box>
								</Link>
								<CardContent sx={{flexGrow: 1, p: 2}}>
									<Typography
										variant='h6'
										sx={{
											fontWeight: "bold",
											mb: 1,
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
										}}
									>
										{service.businessName}
									</Typography>

									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											mb: 1,
										}}
									>
										<Rating
											// value={service.rating || 5}
											value={5}
											precision={0.5}
											readOnly
											sx={{ml: 1}}
										/>
										<Typography
											variant='body2'
											color='text.secondary'
										>
											{/* ({service.reviewCount || 0}) */}({19})
										</Typography>
									</Box>

									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											mb: 2,
										}}
									>
										<LocationOnIcon
											fontSize='small'
											color='primary'
											sx={{ml: 0.5}}
										/>
										<Typography
											variant='body2'
											color='text.secondary'
										>
											{`${service.address?.city || ""}, ${
												service.address?.street || ""
											}`}
										</Typography>
									</Box>
								</CardContent>
							</Card>
						</Box>
					))}
				</Slider>
			) : (
				<Box sx={{textAlign: "center", py: 4}}>
					<Typography variant='body1' color='text.secondary'>
						لا توجد خدمات موصى بها حالياً
					</Typography>
				</Box>
			)}
			<VarticalDevider />
		</Box>
	);
};

export default RecommendedServices;
