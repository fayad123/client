import {FunctionComponent} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Register from "../components/pages/Register";
import BusinessRegister from "../components/pages/BusinessRegister";
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
import SingleServicePage from "../components/pages/ServicesPage";
import Login from "../components/pages/Login";
import Profile from "../components/pages/Profile";
import EditServices from "../components/editVendorPriofileAndServices/EditServices";
import MyBookings from "../components/pages/MyBookings";
import ContactUs from "../components/pages/ContactUs";
import SubscriptionPage from "../components/pages/SubscriptionPage";
import PaymentTerms from "../components/pages/payment/PaymentTerms";
import TermsOfUse from "../components/pages/TermsOfUse";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";
import RecommendedServices from "../components/pages/RecommendedVendors";
import MainFireworksPage from "../components/pages/vendorsPages/MainFireworksPage";
import MainFruitDecorationPage from "../components/pages/vendorsPages/MainFruitDecorationPage";
import MainInvitationCardsPage from "../components/pages/vendorsPages/MainInvitationCardsPage";
import MainKidsEntertainmentPage from "../components/pages/vendorsPages/MainKidsEntertainmentPage";
import MainLuxuryCarsPage from "../components/pages/vendorsPages/MainLuxuryCarsPage";
import MainNutsPage from "../components/pages/vendorsPages/MainNutsPage";
import MainReligiousBandsPage from "../components/pages/vendorsPages/MainReligiousBandsPage";
import MainWeddingGiftsPage from "../components/pages/vendorsPages/MainWeddingGiftsPage";
import UsersTable from "../components/pages/adminManagement/UsersTable";
import VendorsTable from "../components/pages/adminManagement/VendorsTable";

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
			<Route path='/subscribtion' Component={SubscriptionPage} />
			<Route path='/privacy-policy' Component={PrivacyPolicy} />
			<Route path='/payment-terms' Component={PaymentTerms} />
			<Route path='/terms-of-use' Component={TermsOfUse} />
			<Route path='/privacy-policy' Component={PrivacyPolicy} />
			<Route path='/recommended-services' Component={RecommendedServices} />
			<Route path='/manage/users' Component={UsersTable} />
			<Route path='/manage/vendors' Component={VendorsTable} />

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

			{/* Frezzers */}
			<Route path='/frezzer' Component={MainFrezzer} />

			{/* FireworksPage */}
			<Route path='/fireworks' Component={MainFireworksPage} />

			{/* Fruit Decoration */}
			<Route path='/fruit-decoration' Component={MainFruitDecorationPage} />

			{/* Invitation Cards */}
			<Route path='/invitation-cards' Component={MainInvitationCardsPage} />

			{/* Kids Entertainment */}
			<Route path='/Kids-entertainment' Component={MainKidsEntertainmentPage} />

			{/* Luxury Cars */}
			<Route path='/luxury-cars' Component={MainLuxuryCarsPage} />

			{/* Nuts */}
			<Route path='/nuts' Component={MainNutsPage} />

			{/* Religious Bands */}
			<Route path='/religious-bands' Component={MainReligiousBandsPage} />

			{/* Wedding Gifts */}
			<Route path='/wedding-gifts' Component={MainWeddingGiftsPage} />

			<Route path='*' Component={Pnf} />
		</Routes>
	);
};

export default AppRoutes;
