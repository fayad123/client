import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.coocks;

interface MainCooksProps {}

const MainCooks: FunctionComponent<MainCooksProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainCooks;
