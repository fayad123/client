import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.tsx";
import {UserProvider} from "./contextApi/useUserData.tsx";
import {DecodedTokenProvider} from "./contextApi/DecodedTokenContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserProvider>
			<DecodedTokenProvider>
				<App />
			</DecodedTokenProvider>
		</UserProvider>
	</StrictMode>,
);
