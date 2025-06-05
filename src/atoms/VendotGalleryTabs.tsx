import {FunctionComponent, SyntheticEvent, useState} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import VideoUpload from "./Ads/VideoUpload";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface VendorGalleryTabsProps {
	vendorId: string;
}

const VendorGalleryTabs: FunctionComponent<VendorGalleryTabsProps> = ({vendorId}) => {
	const [value, setValue] = useState("1");
	const navigate = useNavigate();

	const handleChange = (e: SyntheticEvent, newValue: string) => {
		e.preventDefault();
		setValue(newValue);
	};

	return (
		<Box sx={{width: "100%", typography: "body1"}}>
			<TabContext value={value}>
				<Button
					size='medium'
					color='primary'
					variant='contained'
					sx={{
						position: "relative",
						top: 0,
					}}
					onClick={() => navigate(`/vendors/${vendorId}`)}
				>
					ادارة الصفحه
				</Button>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						display: "flex",
						justifyContent: "space-around",
					}}
				>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab label='فيديوهات' value='1' />
						<Tab label='صور' value='2' />
					</TabList>
				</Box>
				<TabPanel value='1'>
					<VideoUpload />
				</TabPanel>
				<TabPanel value='2'>صور</TabPanel>
			</TabContext>
		</Box>
	);
};

export default VendorGalleryTabs;
