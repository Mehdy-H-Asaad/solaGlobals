import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryProvider } from "./services/QueryClientProvider.tsx";
import { HashRouter } from "react-router-dom";
import "./i18n";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HashRouter>
			<QueryProvider>
				<App />
			</QueryProvider>
		</HashRouter>
		<Toaster />
	</StrictMode>
);
