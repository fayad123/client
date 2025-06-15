import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.hals;

interface MainWeddingweddingHallsProps {}

const MainWeddingweddingHalls: FunctionComponent<MainWeddingweddingHallsProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainWeddingweddingHalls;
