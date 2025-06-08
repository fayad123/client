import {Box, Typography} from "@mui/material";
import {FunctionComponent, useEffect, useRef, useState} from "react";

interface VideoAdsCarouselProps {
	title?: string;
	videos: string[];
	durationSeconds?: number;
}

const VideoAdsCarousel: FunctionComponent<VideoAdsCarouselProps> = ({
	videos,
	durationSeconds = 10,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [error, setError] = useState<string | null>(null);
	const intervalRef = useRef<NodeJS.Timeout>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Helper function
	function getErrorText(code: number) {
		switch (code) {
			case MediaError.MEDIA_ERR_ABORTED:
				return "Playback aborted";
			case MediaError.MEDIA_ERR_NETWORK:
				return "Network error";
			case MediaError.MEDIA_ERR_DECODE:
				return "Corrupted video";
			case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
				return "Format not supported - use MP4/H.264";
			default:
				return "Unknown error";
		}
	}

useEffect(() => {
	if (videos.length <= 1) return;

	const playInterval = () => {
		intervalRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % videos.length);
		}, durationSeconds * 1000);
	};

	playInterval();

	if (!containerRef.current) return;

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				if (!intervalRef.current) {
					playInterval();
				}
			} else {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
					intervalRef.current = null;
				}
			}
		},
		{threshold: 0.5},
	);

	observer.observe(containerRef.current);

	return () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		observer.disconnect();
	};
}, [videos.length, durationSeconds]);


	if (videos.length === 0) {
		return (
			<Box sx={{maxWidth: 700, mx: "auto"}}>
				<Typography textAlign={"left"}>دعاية منصة افراحنا</Typography>
				<Box
					sx={{
						position: "relative",
						paddingTop: "56.25%",
						borderRadius: 2,
						overflow: "hidden",
						bgcolor: "black",
						boxShadow: 5,
					}}
				>
					<Typography
						color='error'
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						لا تتوفر فيديوهات حالياً
					</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<Box sx={{maxWidth: "100%", mx: "auto"}}>
			<Typography variant="h5" color="warning" textAlign={"left"}>دعاية منصة افراحنا</Typography>
			<Box
				sx={{
					position: "relative",
					paddingTop: "56.25%",
					borderRadius: 2,
					overflow: "hidden",
					bgcolor: "black",
					boxShadow: 5,
				}}
			>
				<video
					crossOrigin='anonymous'
					ref={videoRef}
					key={videos[currentIndex]}
					src={videos[currentIndex]}
					muted
					autoPlay
					playsInline
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
					onError={(e) => {
						const error = e.currentTarget.error;
						console.error("Video error:", error);
						console.log("Video source:", videos[currentIndex]);
						setError(
							error
								? `Video error ${error.code}: ${getErrorText(error.code)}`
								: "Playback failed",
						);
					}}
					onEnded={() => setCurrentIndex((prev) => (prev + 1) % videos.length)}
					onCanPlay={() => setError(null)}
				/>
				{error && (
					<Typography
						color='error'
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						{error}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default VideoAdsCarousel;
