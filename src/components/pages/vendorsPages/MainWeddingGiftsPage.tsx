import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.weddinggifts;

interface MainWeddingGiftsPageProps {}

const MainWeddingGiftsPage: FunctionComponent<MainWeddingGiftsPageProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainWeddingGiftsPage;
