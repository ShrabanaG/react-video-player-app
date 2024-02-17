import { Sidebar } from "./components";
import { Home } from "./pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route element={<Sidebar />}>
						<Route path="/" element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
