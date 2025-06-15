import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.dapkaPlatform;

interface MainDabkePlatformsProps {}

const MainDabkePlatforms: FunctionComponent<MainDabkePlatformsProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainDabkePlatforms;
