import {FunctionComponent, useEffect, useState} from "react";
import {
	AppBar,
	Box,
	Button,
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
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../contextApi/useUserData";
import {Person} from "@mui/icons-material";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SettingsIcon from "@mui/icons-material/Settings";
import SubscripbeButton from "../atoms/subscribeButton/SubscripbeButton";
import theme from "../assets/theme";
import {navbarItems} from "../routes/mainMenu";

const Navbar: FunctionComponent = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const toggleDrawer = (open: boolean) => () => {
		setOpen(open);
	};
	const {user, setUser} = useUser();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
	};

	const businesses: string = user?.businessName
		? user.businessName
		: `${user?.name?.first} ${user?.name?.last}` || "";

	let currentUser = businesses;
	// user?.role === "admin" &&

	return (
		<Box
			sx={{
				flexGrow: 1,
				position: "sticky",
				top: 0,
				zIndex: 2,
				p: 1,
				margin: "auto",
			}}
			width={isMobile ? "100%" : "80%"}
		>
			<AppBar
				sx={{
					backgroundColor: "#681024",
					zIndex: 2,
					borderRadius: 10,
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
							backgroundColor: "#681024",
							color: "white",
							width: "100%",
							// borderRadius: 4,
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
						{user && user.role === "isVendor" && !user.isSubscribed && (
							<SubscripbeButton />
						)}
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
							افراحــنـا
						</Typography>
						{!user?._id ? (
							<Box>
								<Button
									color='warning'
									variant='contained'
									size='medium'
									onClick={() => navigate("/login")}
								>
									الدخول
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
									تسجيل الخروج
								</Button>
							</Box>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			<Drawer
				anchor={isMobile ? "top" : "right"}
				open={open}
				onClose={toggleDrawer(false)}
			>
				{user && (
					<Box
						style={{
							width: "100%",
							textDecoration: "none",
							color: "white",
							backgroundColor: "#681024",
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
						{navbarItems.map((item) => (
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
					{user && user.role === "admin" && (
						<>
							<ListItem disablePadding>
								<Link
									to={`/manage/users`}
									style={{
										width: "100%",
										textDecoration: "none",
									}}
								>
									<ListItemButton>
										<ListItemIcon>
											<SettingsIcon
												color='info'
												className='settings-icon'
											/>
										</ListItemIcon>
										<ListItemText primary={"ادارة المستخدمين"} />
									</ListItemButton>
								</Link>
							</ListItem>
							<ListItem disablePadding>
								<Link
									to={`/manage/vendors`}
									style={{
										width: "100%",
										textDecoration: "none",
									}}
								>
									<ListItemButton>
										<ListItemIcon>
											<SettingsIcon
												color='primary'
												className='settings-icon'
											/>
										</ListItemIcon>
										<ListItemText primary={"ادارو مزودي الخدمات"} />
									</ListItemButton>
								</Link>
							</ListItem>
						</>
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
