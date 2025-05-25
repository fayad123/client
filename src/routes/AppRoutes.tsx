import {FunctionComponent} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Register from "../components/Register";
import BusinessRegister from "../components/BusinessRegister";
import MainCoffeeKiosks from "../components/pages/vendorsPages/MainCoffeeKiosks";
import MainChairses from "../components/pages/vendorsPages/MainChairses";
import MainCosmatics from "../components/pages/vendorsPages/MainCosmatics";
import MainDabkePlatforms from "../components/pages/vendorsPages/MainDabkePlatforms";
import MainCooks from "../components/pages/vendorsPages/MainCooks";
import MainPhotography from "../components/pages/vendorsPages/MainPhotography";
import MainPastry from "../components/pages/vendorsPages/MainPastry";
import MainRestaurants from "../components/pages/vendorsPages/MainRestaurants";
import MainWaiters from "../components/pages/vendorsPages/MainWaiters";
import MainSterio from "../components/pages/vendorsPages/MainSterio";
import MainWeddingHalls from "../components/pages/vendorsPages/MainWeddingHalls";
import MainHalsDecoration from "../components/pages/vendorsPages/MainHalsDecoration";
import MainCarsDecoration from "../components/pages/vendorsPages/MainCarsDecoration";
import MainFrezzer from "../components/pages/vendorsPages/MainFrezzer";
import Pnf from "../components/Pnf";
import SingleServicePage from "../components/pages/services/ServicesPage";
import Login from "../components/Login";
import Profile from "../components/Profile";
import EditServices from "../components/pages/services/EditServices";
import MyBookings from "../components/pages/MyBookings";
import ContactUs from "../components/ContactUs";

interface AppRoutesProps {}

const AppRoutes: FunctionComponent<AppRoutesProps> = () => {
	return (
		<Routes>
			<Route path='/' Component={Home} />
			<Route path='/about' Component={About} />
			<Route path='/contact' Component={ContactUs} />
			<Route path='/login' Component={Login} />
			<Route path='/register' Component={Register} />
			<Route path='/profile' Component={Profile} />
			<Route path='/business-register' Component={BusinessRegister} />
			<Route path='/My-bookings' Component={MyBookings} />
			<Route path='/service/:vendorId' Component={SingleServicePage} />
			<Route path='/vendors/:vendorId' Component={EditServices} />

			{/* chairses rent */}
			<Route path='/chairses' Component={MainChairses} />

			{/* cosmatics */}
			<Route path='/cosmatics' Component={MainCosmatics} />

			{/* CoffeeKiosks */}
			<Route path='/coffee-Kiosks' Component={MainCoffeeKiosks} />

			{/* dabkePlatforms */}
			<Route path='/dabke-platforms' Component={MainDabkePlatforms} />

			{/* cooks */}
			<Route path='/cooks' Component={MainCooks} />

			{/* pastry */}
			<Route path='/pastry' Component={MainPastry} />

			{/* photography */}
			<Route path='/photography' Component={MainPhotography} />

			{/* restaurants */}
			<Route path='/restaurants' Component={MainRestaurants} />

			{/* stereo */}
			<Route path='/sterio' Component={MainSterio} />

			{/* waiters */}
			<Route path='/waiters' Component={MainWaiters} />

			{/* weddingHalls */}
			<Route path='/wedding-halls' Component={MainWeddingHalls} />

			{/* hals decoration */}
			<Route path='/hals-decoration' Component={MainHalsDecoration} />

			{/* cars decoration */}
			<Route path='/cars-decoration' Component={MainCarsDecoration} />

			{/* weddingHalls */}
			<Route path='/wedding-halls' Component={MainWeddingHalls} />

			{/* Frezzers */}
			<Route path='/frezzer' Component={MainFrezzer} />

			<Route path='*' Component={Pnf} />
		</Routes>
	);
};

export default AppRoutes;
