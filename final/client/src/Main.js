import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Nopage from "./pages/Nopage";

import { useState, useEffect } from "react";

function Main() {
	const [loginUser, setLoginUser] = useState(
		sessionStorage.getItem("username")
	);
	const [token, setToken] = useState(null);

	let data = {
		loginUser: loginUser,
		setLoginUser: setLoginUser,
		token: token
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout data={data} />} >
					<Route path="login" element={<Login data={data} />} />
					<Route path="info" element={<Info data={data} />} />
					<Route path="form" element={<Form />} />
					<Route path="*" element={<Nopage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
};

export default Main;