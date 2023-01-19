import { useState, useEffect } from "react";
import jsonSrv from "../services/jsonSrv";

function Profile() {
	const [user, setUser] = useState([
		{
			fname: "",
			lname: "",
			email: "",
			password: "",
		}
	]);

	useEffect(() => {
		let user_id = sessionStorage.getItem("user_id");
		let data = {
			user_id: user_id
		};
		jsonSrv.post("user", data).then((response) => {
			setUser(response.data);
		});
	}, []);

	function changePassword(e) {
		e.preventDefault();
		let user_id = sessionStorage.getItem("user_id");
		let password = e.target.password.value;
		let data = {
			user_id: user_id,
			password: password
		};
		jsonSrv.post("change_password", data).then((response) => {
			if (response.data) {
				console.log(response.data);
			}
		});
	}
	return (
		<>
			<h1>Profile</h1>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{user[0].fname}</td>
						<td>{user[0].lname}</td>
						<td>{user[0].email}</td>
						<td>{user[0].role}</td>
					</tr>
				</tbody>
			</table>
			<form onSubmit={changePassword}>
				<label htmlFor="password">Change password</label>
				<input type="password" id="password" name="password" />
				<button type="submit">Change</button>
			</form>
		</>
	)
}

export default Profile;