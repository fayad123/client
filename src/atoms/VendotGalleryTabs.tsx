import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	SyntheticEvent,
	useState,
} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import VideoUpload from "./Ads/VideoUpload";
// import {Button} from "@mui/material";
// import {useNavigate} from "react-router-dom";

interface VendorGalleryTabsProps {
	vendorId: string;
	openGalleries: Dispatch<SetStateAction<boolean>>;
	setGalleryType: Dispatch<SetStateAction<"main" | "photos" | "videos" | "contact">>;
}

const VendorGalleryTabs: FunctionComponent<VendorGalleryTabsProps> = ({
	openGalleries,
	setGalleryType,
}) => {
	const [value, setValue] = useState("1");
	// const navigate = useNavigate();

	const handleChange = (e: SyntheticEvent, newValue: string) => {
		e.preventDefault();
		setValue(newValue);
	};

	return (
		<Box sx={{width: "100%", typography: "body1"}}>
			<TabContext value={value}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						display: "flex",
						justifyContent: "space-around",
					}}
				>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("main");
							}}
							label='الرئيسية'
							value='1'
						/>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("videos");
							}}
							label='فيديوهات'
							value='2'
						/>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("photos");
							}}
							label='صور'
							value='3'
						/>
						<Tab
							onClick={() => {
								openGalleries(true);
								setGalleryType("contact");
							}}
							label='معلومات الاتصال'
							value='4'
						/>
					</TabList>
				</Box>
			</TabContext>
		</Box>
	);
};

export default VendorGalleryTabs;
