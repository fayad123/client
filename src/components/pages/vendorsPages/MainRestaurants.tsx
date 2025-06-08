import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Services} from "../../../interfaces/services";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.restaurants;

interface MainRestaurantsProps {}

const MainRestaurants: FunctionComponent<MainRestaurantsProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainRestaurants;
