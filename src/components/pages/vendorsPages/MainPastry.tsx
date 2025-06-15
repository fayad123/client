import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.pastry;

interface MainPastryProps {}

const MainPastry: FunctionComponent<MainPastryProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainPastry;
