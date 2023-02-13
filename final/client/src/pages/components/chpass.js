import { useState, useEffect } from "react";
import jsonSrv from "../../services/jsonSrv";

function ChPass({ data }) {
	function changePassword(e) {
		e.preventDefault();
		let user_id = sessionStorage.getItem("user_id");
		let password = e.target.password.value;
		let send_data = {
			user_id: user_id,
			password: password,
			role: sessionStorage.getItem("role")
		};
		console.log(send_data);
		jsonSrv.post("change_password", send_data).then((response) => {
			if (response.data) {
				console.log(response.data);
			}
		});
	}
	return (
		<>
			<form onSubmit={changePassword}>
				<label htmlFor="password">Change password</label>
				<input type="password" id="password" name="password" />
				<button type="submit">Change</button>
			</form>
		</>
	)
}

export default ChPass;