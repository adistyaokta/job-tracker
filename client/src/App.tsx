import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import { Dashboard } from "./Pages/Dashboard";
import { Profile } from "./Pages/Profile";

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<main className="h-dvh max-w-screen flex justify-center overflow-hidden p-2 bg-secondary">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</main>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
