import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.luxuryCars;

interface MainLuxuryCarsPageProps {}

const MainLuxuryCarsPage: FunctionComponent<MainLuxuryCarsPageProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainLuxuryCarsPage;
