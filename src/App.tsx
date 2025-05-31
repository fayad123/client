import Navbar from "./components/Navbar";
import {BrowserRouter as Router} from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from "stylis";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Toaster} from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";


export const theme = createTheme({
	direction: "rtl",
	palette: {
		primary: {
			main: "#1976d2", // blue
		},
		background: {
			default: "#121212", // dark background
		},
		text: {
			primary: "#1976d2", // white blue
		},
	},
});

const cacheRtl = createCache({
	key: "muirtl",
	stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
	return (
			<Router>
				<Navbar />
				<Toaster position='top-center' reverseOrder={false} />
				<CacheProvider value={cacheRtl}>
					<ThemeProvider theme={theme}>
						<AppRoutes />
					</ThemeProvider>
				</CacheProvider>
				<Footer />
			</Router>
	);
}

export default App;
