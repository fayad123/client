import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.chairs;

interface MainChairsProps {}

const MainChairs: FunctionComponent<MainChairsProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainChairs;
