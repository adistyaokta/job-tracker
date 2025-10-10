import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import { Dashboard } from "./Pages/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
