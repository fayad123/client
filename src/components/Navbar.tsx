import {FunctionComponent, useState} from "react";
import {
	AppBar,
	Box,
	Button,
	CardMedia,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../contextApi/useUserData";
import {Person} from "@mui/icons-material";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar: FunctionComponent = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const toggleDrawer = (open: boolean) => () => {
		setOpen(open);
	};
	const {user, setUser} = useUser();

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
	};

	const businesses: string = user?.businessName?user.businessName:`${user?.name.first} ${user?.name.last}`||'';

	let currentUser = businesses

	const menuItems = [
		{
			text: "الرئيسيه",
			icon: <HomeIcon sx={{fontSize: 30}} color='error' />,
			path: "/",
		},
		{
			text: "من نحن",
			icon: <InfoIcon sx={{fontSize: 30}} color='warning' />,
			path: "/about",
		},
		{
			text: "اتصل بنا",
			icon: <ContactMailIcon sx={{fontSize: 30}} color='success' />,
			path: "/contact",
		},
	];

	return (
		<Box
			sx={{
				flexGrow: 1,
				position: "sticky",
				top: 0,
				zIndex: 1,
				p: 1,
			}}
		>
			<AppBar
				sx={{
					backgroundColor: "#915200",
					zIndex: 100,
					borderRadius: 20,
					fontSize: "1.2rem",
				}}
				position='sticky'
			>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							px: 2,
							py: 2,
							backgroundColor: "#915200",

							color: "white",
							width: "100%",
						}}
					>
						<IconButton
							size='small'
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={toggleDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
						<CardMedia
							component='img'
							image='/wedding-rings.png'
							alt='תיאור של התמונה'
							sx={{height: 40, width: 40}}
						/>
						<Typography
							onClick={() => navigate("/")}
							variant='h5'
							sx={{
								cursor: "pointer",
								fontWeight: "bold",
								color: "white",
								"&:hover": {color: "yellow"},
							}}
						>
							مــﯜڦــ؏ اڣــڕاحــڼــ̍ا
						</Typography>
						<CardMedia
							component='img'
							image='/wedding-rings.png'
							alt='תיאור של התמונה'
							sx={{height: 40, width: 40}}
						/>
						{!user?._id ? (
							<Box>
								<Button
									color='warning'
									variant='contained'
									size='medium'
									onClick={() => navigate("/login")}
								>
									تسجيل الدخول
								</Button>
							</Box>
						) : (
							<Box>
								<Button
									color='error'
									variant='contained'
									size='medium'
									onClick={logout}
								>
									الخروج
								</Button>
							</Box>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			<Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
				{user && (
					<Box
						style={{
							width: "100%",
							textDecoration: "none",
							color: "white",
							backgroundColor: "#915200be",
						}}
					>
						<Typography
							variant='h6'
							sx={{
								fontWeight: 1000,
								p: 1,
								textAlign: "center",
								border: 4,
							}}
						>
							{currentUser}
						</Typography>
					</Box>
				)}
				<Typography
					variant='h6'
					sx={{
						textAlign: "center",
						border: 1,
						borderRadius: 3,
						mx: 1,
					}}
				>
					{user?.email}
				</Typography>
				<Box
					sx={{width: 250}}
					role='presentation'
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<List>
						{menuItems.map((item) => (
							<ListItem key={item.text} disablePadding>
								<Link
									to={item.path}
									style={{
										width: "100%",
										textDecoration: "none",
										color: "inherit",
									}}
								>
									<ListItemButton>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.text} />
									</ListItemButton>
								</Link>
							</ListItem>
						))}
					</List>{" "}
					{user && (
						<>
							<Typography
								color='warning'
								sx={{
									fontWeight: "bold",
									fontSize: 25,
									backgroundColor: "AppWorkspace",
									textAlign: "center",
								}}
							>
								ادارة
							</Typography>

							<ListItem disablePadding>
								<Link
									to={"/profile"}
									style={{
										width: "100%",
										textDecoration: "none",
										color: "inherit",
									}}
								>
									<ListItemButton>
										<ListItemIcon>
											<Person />
										</ListItemIcon>
										<ListItemText primary={"الملف الشخصي"} />
									</ListItemButton>
								</Link>
							</ListItem>

							<ListItem disablePadding>
								<Link
									to={"/my-bookings"}
									style={{
										width: "100%",
										textDecoration: "none",
										color: "inherit",
									}}
								>
									<ListItemButton>
										<ListItemIcon>
											<ChecklistRtlIcon />
										</ListItemIcon>
										<ListItemText primary={"حجوزات"} />
									</ListItemButton>
								</Link>
							</ListItem>
						</>
					)}
					{user && user?.role === "isVendor" && (
						<ListItem disablePadding>
							<Link
								to={`/vendors/${user._id}`}
								style={{
									width: "100%",
									textDecoration: "none",
									color: "inherit",
								}}
							>
								<ListItemButton>
									<ListItemIcon>
										<SettingsIcon
											color='info'
											className='settings-icon'
										/>
									</ListItemIcon>
									<ListItemText primary={"اداره الخدمات"} />
								</ListItemButton>
							</Link>
						</ListItem>
					)}
					{user && (
						<>
							<Divider color='error' variant='fullWidth' />
							<Box>
								<Button
									sx={{width: "100%"}}
									color='error'
									variant='text'
									onClick={logout}
								>
									تسجيل خروج
								</Button>
							</Box>
						</>
					)}
				</Box>
			</Drawer>
		</Box>
	);
};

export default Navbar;
