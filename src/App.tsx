import { useEffect } from "react";
import { Sidebar } from "./components";
import { Home } from "./pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UIContextProvider } from "./contexts";
import PlayVideo from "./pages/playVideo/PlayVideo";

function App() {
	useEffect(() => {
		if (!localStorage.getItem("theme")) {
			localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
		}
	}, []);

	console.log("theme", localStorage.getItem("theme"));

	return (
		<div className="app ">
			<BrowserRouter>
				<UIContextProvider>
					<Routes>
						<Route element={<Sidebar />}>
							<Route path="/" element={<Home />} />
							<Route path="/video" element={<PlayVideo />} />
						</Route>
					</Routes>
				</UIContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
