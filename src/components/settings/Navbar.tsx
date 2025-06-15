import {FunctionComponent, JSX, useEffect, useMemo, useState} from "react";
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
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../../contextApi/useUserData";
import {Logout, Person} from "@mui/icons-material";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SettingsIcon from "@mui/icons-material/Settings";
import SubscripbeButton from "../../subscribes/subscribeButton/SubscripbeButton";
import {navbarItems} from "../../config/mainMenu";
import {CloseButton} from "react-bootstrap";

const Navbar: FunctionComponent = () => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const location = useLocation();
	const {user, setUser} = useUser();

	const toggleDrawer = (open: boolean) => () => {
		setOpen(open);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
	};

	const currentUser = useMemo(() => {
		return (
			user?.businessName || `${user?.name?.first ?? ""} ${user?.name?.last ?? ""}`
		);
	}, [user]);

	const navLinkItem = (path: string, icon: JSX.Element, text: string) => (
		<ListItem disablePadding>
			<NavLink
				to={path}
				style={{width: "100%", textDecoration: "none", color: "inherit"}}
			>
				<ListItemButton>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={text} />
				</ListItemButton>
			</NavLink>
		</ListItem>
	);

	return (
		<Box
			sx={{
				flexGrow: 1,
				position: "sticky",
				top: 0,
				zIndex: 1001,
				p: 1,
				margin: "auto",
			}}
			width={isMobile ? "100%" : "90%"}
		>
			<AppBar
				sx={{
					zIndex: 2,
					borderRadius: 10,
					fontSize: "1.2rem",
				}}
				position="sticky"
			>
				<Toolbar>
					<Box
						component={"nav"}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							px: 2,
							py: 2,
							color: "white",
							width: "100%",
							borderRadius: 8,
							boxShadow: "0 0 10px 2px inset black ",
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

						<NavLink
							to='/'
							style={{
								cursor: "pointer",
								fontWeight: "bold",
								color: "white",
							}}
						>
							افراحـنـا
						</NavLink>

						{!user?._id ? (
							<Box>
								<Button
									variant='contained'
									onClick={() => navigate("/login")}
									color='warning'
								>
									الدخول
								</Button>
							</Box>
						) : (
							<Box>
								<Button
									color='error'
									variant='contained'
									size='small'
									onClick={logout}
								>
									خروج
								</Button>
							</Box>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			<Drawer
				variant='temporary'
				anchor={isMobile ? "top" : "right"}
				open={open}
				onClose={toggleDrawer(false)}
			>
				<CloseButton style={{width: "50%"}} onClick={toggleDrawer(false)} />

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
				{user?.email && (
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
				)}

				<Box
					role='presentation'
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
					width={isMobile ? "100%" : 250}
				>
					<List>
						{navbarItems.map((item) =>
							navLinkItem(item.path, item.icon, item.text),
						)}

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

								{navLinkItem("/profile", <Person />, "الملف الشخصي")}
								{navLinkItem(
									"/my-bookings",
									<ChecklistRtlIcon />,
									"حجوزات",
								)}
							</>
						)}
						{user?.role === "isVendor" &&
							navLinkItem(
								`/vendors/${user._id}`,
								<SettingsIcon color='info' />,
								"اداره الخدمات",
							)}

						{user?.role === "admin" && (
							<>
								{navLinkItem(
									"/manage/users",
									<SettingsIcon color='info' />,
									"ادارة المستخدمين",
								)}
								{navLinkItem(
									"/manage/vendors",
									<SettingsIcon color='primary' />,
									"ادارة مزودي الخدمات",
								)}
							</>
						)}

						{user?.role === "isVendor" && !user.isSubscribed && (
							<Box sx={{width: "100%", m: "auto"}}>
								<SubscripbeButton />
							</Box>
						)}

						<Divider color='error' variant='fullWidth' />
						{user?._id ? (
							<Box
								sx={{position: "relative", right: 0, left: 0, bottom: 0}}
							>
								<Button
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: "space-around",
									}}
									color='error'
									variant='outlined'
									onClick={logout}
								>
									<Logout />
									خروج
								</Button>
							</Box>
						) : (
							<Box>
								<Button
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: "space-around",
									}}
									color='error'
									variant='outlined'
									onClick={() => navigate("/login")}
								>
									الدخول
								</Button>
							</Box>
						)}
					</List>
				</Box>
			</Drawer>
		</Box>
	);
};

export default Navbar;
