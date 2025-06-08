import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.photography;

interface MainPhotographyProps {}

const MainPhotography: FunctionComponent<MainPhotographyProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainPhotography;
