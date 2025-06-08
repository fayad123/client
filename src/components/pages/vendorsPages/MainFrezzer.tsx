import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.frezzer;

interface MainFrezzerProps {}

const MainFrezzer: FunctionComponent<MainFrezzerProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainFrezzer;
