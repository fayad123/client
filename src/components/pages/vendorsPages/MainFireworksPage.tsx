import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.fireWorks;

interface MainFireworksPageProps {}

const MainFireworksPage: FunctionComponent<MainFireworksPageProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainFireworksPage;
