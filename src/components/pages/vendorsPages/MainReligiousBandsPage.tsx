import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.religiousband;

interface MainReligiousBandsPageProps {}

const MainReligiousBandsPage: FunctionComponent<MainReligiousBandsPageProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainReligiousBandsPage;
