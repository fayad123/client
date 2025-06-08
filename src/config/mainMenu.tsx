import {
	Coffee,
	Spa,
	Celebration,
	DirectionsCar,
	Cake,
	Kitchen,
	Festival,
	CameraAlt,
	Speaker,
	Restaurant,
	RoomService,
	MeetingRoom,
	Flatware,
	Chair,
	LocalFireDepartment,
	Brush,
	ChildCare,
	DirectionsCarFilled,
	EmojiEvents,
	LocalFlorist,
	RestaurantMenu,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export const mainMenu = [
	{
		label: "قاعات",
		icon: <MeetingRoom fontSize='medium' color='warning' />,
		link: "/wedding-halls",
	},
	{
		label: "تزيين قاعات",
		icon: <Celebration fontSize='medium' color='warning' />,
		link: "/hals-decoration",
	},
	{
		label: "تزيين سيارات",
		icon: <DirectionsCar fontSize='medium' color='warning' />,
		link: "/cars-decoration",
	},
	{
		label: "كيوسكات قهوة",
		icon: <Coffee fontSize='medium' color='warning' />,
		link: "/coffee-kiosks",
	},
	{
		label: "صالونات تجميل",
		icon: <Spa fontSize='medium' color='warning' />,
		link: "/cosmatics",
	},
	{
		label: "تأجير كراسي",
		icon: <Chair fontSize='medium' color='warning' />,
		link: "/chairs",
	},
	{
		label: "حلويات",
		icon: <Cake fontSize='medium' color='warning' />,
		link: "/pastry",
	},
	{
		label: "تأجير برادات",
		icon: <Kitchen fontSize='medium' color='warning' />,
		link: "/frezzer",
	},
	{
		label: "منصات دبكة",
		icon: <Festival fontSize='medium' color='warning' />,
		link: "/dabke-platforms",
	},
	{
		label: "تصوير",
		icon: <CameraAlt fontSize='medium' color='warning' />,
		link: "/photography",
	},
	{
		label: "ستيريو",
		icon: <Speaker fontSize='medium' color='warning' />,
		link: "/sterio",
	},
	{
		label: "طباخين",
		icon: <Restaurant fontSize='medium' color='warning' />,
		link: "/cooks",
	},
	{
		label: "مطاعم للأعراس",
		icon: <Flatware fontSize='medium' color='warning' />,
		link: "/restaurants",
	},
	{
		label: "نادلين",
		icon: <RoomService fontSize='medium' color='warning' />,
		link: "/Waiters",
	},
	{
		label: "العاب نارية",
		icon: <LocalFireDepartment fontSize='medium' color='warning' />,
		link: "/fireworks",
	},
	{
		label: "بطاقات دعوة",
		icon: <Brush fontSize='medium' color='warning' />,
		link: "/invitation-cards",
	},
	{
		label: "مكسرات",
		icon: <RestaurantMenu fontSize='medium' color='warning' />,
		link: "/nuts",
	},
	{
		label: "فرق دينية",
		icon: <EmojiEvents fontSize='medium' color='warning' />,
		link: "/religious-bands",
	},
	{
		label: "الهاء الأطفال",
		icon: <ChildCare fontSize='medium' color='warning' />,
		link: "/kids-entertainment",
	},
	{
		label: "تزيين فاكهة",
		icon: <LocalFlorist fontSize='medium' color='warning' />,
		link: "/fruit-decoration",
	},
	{
		label: "تنسيق هدايا للعرسان",
		icon: <EmojiEvents fontSize='medium' color='warning' />,
		link: "/wedding-gifts",
	},
	{
		label: "تأجير سيارات فخمة",
		icon: <DirectionsCarFilled fontSize='medium' color='warning' />,
		link: "/luxury-cars",
	},
];


export const navbarItems = [
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