import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.halsDecoration;

interface MainHalsDecorationProps {}

const MainHalsDecoration: FunctionComponent<MainHalsDecorationProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainHalsDecoration;
