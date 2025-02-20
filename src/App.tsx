import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { SourcePage } from "./pages/dashboard/SourcePage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { NotFound404 } from "./components/NotFound404";
import { AdminNavbar } from "./components/dashboard/AdminNavbar";
import { DestinationPage } from "./pages/dashboard/DestinationPage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { InlandTransportsPage } from "./pages/dashboard/InlandTransportsPage";
import { MaritimeTransportPage } from "./pages/dashboard/MaritimeTransportPage";
import { ShippingLinesPage } from "./pages/dashboard/ShippingLinesPage";
function App() {
	const { i18n } = useTranslation();

	useEffect(() => {
		document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="admin/login" element={<AdminLoginPage />} />
				<Route path="/admin" element={<ProtectedRoutes />}>
					<Route element={<AdminNavbar />}>
						<Route path="source" element={<SourcePage />} />
						<Route path="destination" element={<DestinationPage />} />
						<Route
							path="inland-transports"
							element={<InlandTransportsPage />}
						/>
						<Route
							path="maritime-transports"
							element={<MaritimeTransportPage />}
						/>
						<Route path="shipping-lines" element={<ShippingLinesPage />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</>
	);
}

export default App;
