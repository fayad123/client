import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.witress;

interface MainWaitersProps {}

const MainWaiters: FunctionComponent<MainWaitersProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainWaiters;
