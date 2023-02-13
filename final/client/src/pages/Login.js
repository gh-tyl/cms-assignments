import { useNavigate } from "react-router-dom";
import jsonSrv from "../services/jsonSrv";

function Login({ data }) {
	let loginUser = data.loginUser
	let setLoginUser = data.setLoginUser
	let token = data.token

	const navigate = useNavigate();

	const submit = (e) => {
		e.preventDefault();
		// let email = e.target.email.value;
		// let password = e.target.password.value;	
		// let email = "rsames0@nps.gov" // 1001 // stu
		// // let password = "mmsmf3Gx2";
		// let password = "test";
		// let role = "student";
		let email = "alopez" // 1001 // teacher
		let password = "test32";
		let role = "teacher";
		// let email = "gmcnerlin1@huffingtonpost.com" // 1001 // stu
		// // let password = "mmsmf3Gx2";
		// let password = "LsuTtR";
		// let role = "student";
		let data = {
			email: email,
			password: password,
			role: role
		};
		console.log(data);
		jsonSrv.post("login", data).then((response) => {
			if (response.data) {
				console.log(response.data);
				let user = response.data;
				console.log(user);
				let user_name = user[0].fname + " " + user[0].lname;
				let user_id = ""
				if (role == "teacher") {
					user_id = user[0].id;
				} else {
					user_id = user[0].studentid;
				}
				setLoginUser(user_name);
				sessionStorage.setItem("user", user);
				sessionStorage.setItem("user_id", user_id);
				sessionStorage.setItem("role", role);
				sessionStorage.setItem("token", response.data.token);
				sessionStorage.setItem("username", user_name);
				navigate("/info");
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
				<select name="role" id="role">
					<option value="teacher">teacher</option>
					<option value="student">student</option>
				</select>
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default Login;