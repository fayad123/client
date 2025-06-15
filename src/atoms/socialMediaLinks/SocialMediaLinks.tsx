import {Box, IconButton, Tooltip} from "@mui/material";
import {Instagram, Facebook, Twitter} from "@mui/icons-material";

interface SocialMediaLinksProps {
	instagram?: string;
	facebook?: string;
	twitter?: string;
	color?:
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning"
		| "inherit";
	size?: "small" | "medium" | "large";
	iconSize?: number;
	spacing?: number;
	mt?: number;
}

export default function SocialMediaLinks({
	instagram,
	facebook,
	twitter,
	color = "primary",
	size = "large",
	iconSize,
	spacing = 4,
	mt = 4,
	...props
}: SocialMediaLinksProps) {
	// Size mapping for icons
	const sizeMap = {
		small: iconSize || 24,
		medium: iconSize || 32,
		large: iconSize || 40,
	};

	const platforms = [
		{name: "Instagram", url: instagram, icon: Instagram, color},
		{name: "Facebook", url: facebook, icon: Facebook, color},
		{name: "X", url: twitter, icon: Twitter, color},
	];

	return (
		<Box
			display='flex'
			justifyContent='space-evenly'
			gap={spacing}
			mt={mt}
			{...props}
		>
			{platforms.map(
				(platform) =>
					platform.url && (
						<Tooltip key={platform.name} title={platform.name} arrow>
							<IconButton
								component='a'
								href={platform.url}
								target='_blank'
								rel='noopener noreferrer'
								color={platform.color as any}
								size={size}
								aria-label={platform.name}
								sx={{
									width: sizeMap[size],
									height: sizeMap[size],
									"& svg": {
										fontSize: sizeMap[size],
									},
								}}
							>
								<platform.icon fontSize='inherit' />
							</IconButton>
						</Tooltip>
					),
			)}
		</Box>
	);
}
