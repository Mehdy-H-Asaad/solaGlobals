import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
function App() {
	const location = useLocation();
	const isAdminURL = location.pathname.startsWith("/admin");

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>

			<Routes>
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</>
	);
}

export default App;
