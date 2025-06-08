import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.nuts;

interface MainNutsPageProps {}

const MainNutsPage: FunctionComponent<MainNutsPageProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainNutsPage;
