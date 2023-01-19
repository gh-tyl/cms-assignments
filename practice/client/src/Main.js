import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Prescriptions from "./pages/Prescriptions";
import Nopage from "./pages/Nopage";

function Main() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />} >
					<Route path="login" element={<Login />} />
					<Route path="profile" element={<Profile />} />
					<Route path="prescriptions" element={<Prescriptions />} />
					<Route path="*" element={<Nopage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
};

export default Main;