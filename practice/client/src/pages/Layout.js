import { Outlet, Link } from "react-router-dom"

function Layout() {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<Link to="/prescriptions">Prescriptions</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	)
}

export default Layout;