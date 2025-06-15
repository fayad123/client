import {FunctionComponent} from "react";
import {servicePagesConfig} from "../../../config/servicePagesConfig";
import GlobalServicePage from "./GlobalVendorsPage";
const config = servicePagesConfig.invitationCards;

interface MainInvitationCardsPageProps {}

const MainInvitationCardsPage: FunctionComponent<MainInvitationCardsPageProps> = () => {
	return <GlobalServicePage {...config} />;
};

export default MainInvitationCardsPage;
