import {FunctionComponent} from "react";
import GlobalServicePage from "./GlobalVendorsPage";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
const config = servicePagesConfig.coffeeKiosks;

interface MainCoffeeKiosksProps {}

const MainCoffeeKiosks: FunctionComponent<MainCoffeeKiosksProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainCoffeeKiosks;
