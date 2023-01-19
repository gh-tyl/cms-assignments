import jsonSrv from "../services/jsonSrv";

function Login() {
	const submit = (e) => {
		e.preventDefault();
		// let email = e.target.email.value;
		// let password = e.target.password.value;	
		// let email = "wcostock2m@google.fr"; // 10095
		// let password = "b2GuAvnR";
		let email = "tbriamo0@acquirethisname.com"
		let password = "3z0qn12nJ";
		// let password = "test";
		let data = {
			email: email,
			password: password
		};
		console.log(data);
		jsonSrv.post("login", data).then((response) => {
			if (response.data) {
				console.log(response.data);
				let user = response.data;
				let user_id = user[0].uid;
				sessionStorage.setItem("user_id", user_id);
				window.location.href = "/profile";
			}
		}
		);
	}
	return (
		<>
			<h1>Login</h1>
			<form onSubmit={submit}>
				<label htmlFor="email">Email</label>
				<input type="text" id="email" name="email" />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" />
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;