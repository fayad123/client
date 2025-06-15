import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.fruitDecoration;

interface MainFruitDecorationPageProps {}

const MainFruitDecorationPage: FunctionComponent<MainFruitDecorationPageProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainFruitDecorationPage;
