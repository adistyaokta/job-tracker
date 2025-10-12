import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import { Dashboard } from "./Pages/Dashboard";
import { Profile } from "./Pages/Profile";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
