import {FunctionComponent} from "react";

import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.kidsEntertainment;

interface MainKidsEntertainmentPageProps {}

const MainKidsEntertainmentPage: FunctionComponent<
	MainKidsEntertainmentPageProps
> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainKidsEntertainmentPage;
