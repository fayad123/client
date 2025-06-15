import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.stereo;

interface MainSterioProps {}

const MainSterio: FunctionComponent<MainSterioProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainSterio;
