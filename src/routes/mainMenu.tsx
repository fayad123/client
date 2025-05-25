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
} from "@mui/icons-material";

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
		label: "كيوسكات قهوه",
		icon: <Coffee fontSize='medium' color='warning' />,
		link: "/coffee-Kiosks",
	},
	{
		label: "صالونات تجميل",
		icon: <Spa fontSize='medium' color='warning' />,
		link: "/cosmatics",
	},
	{
		label: "تأجير كراسي",
		icon: <Chair fontSize='medium' color='warning' />,
		link: "/chairses",
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
];
