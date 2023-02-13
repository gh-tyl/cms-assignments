import { Outlet, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Layout({ data }) {
	const navigate = useNavigate();
	let loginUser = data.loginUser
	let setLoginUser = data.setLoginUser
	let token = data.token

	function logout() {
		console.log("logout")
		sessionStorage.removeItem("user_id");
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("role");
		sessionStorage.removeItem("username");
		setLoginUser("")
		navigate("/login");
	}

	return (
		<>
			<p>{loginUser}</p>
			<nav>
				<ul>
					<li>
						<Link to="/login">Login</Link>
					</li>
					{
						loginUser &&
						(
							<li>
								<Link to="/info">Info</Link>
							</li>
						)
					}
					<li>
						<button onClick={logout}>
							Logout
						</button>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	)
}

export default Layout;