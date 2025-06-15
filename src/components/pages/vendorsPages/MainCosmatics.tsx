import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.cosmatics;

interface MainCosmaticsProps {}

const MainCosmatics: FunctionComponent<MainCosmaticsProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainCosmatics;
