import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.carsDecoration;

interface MainCarsDecorationProps {}

const MainCarsDecoration: FunctionComponent<MainCarsDecorationProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainCarsDecoration;
