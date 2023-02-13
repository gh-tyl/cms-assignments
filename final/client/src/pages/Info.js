import { useState, useEffect } from "react";
import jsonSrv from "../services/jsonSrv";

import Teacher from "./components/teacher"
import Student from "./components/student"
import ChPass from "./components/chpass"

function Info({ data }) {
	let loginUser = data.loginUser
	let setLoginUser = data.setLoginUser
	// let token = data.token
	let role = sessionStorage.getItem("role")

	const [user, setUser] = useState([
		{
			fname: "",
			lname: "",
			email: "",
			role: ""
		}
	]);

	let get_data = {
		"user_id": sessionStorage.getItem("user_id"),
		"role": role
	}

	const [stuList, setStuList] = useState([
		{
			"gpa": 0
		}
	]);
	// const [teacherData, setTeacherData] = useState({});

	useEffect(() => {
		jsonSrv.post("user", get_data).then((response) => {
			let res_data = response.data[0];
			// res_data.role = role;
			setUser(res_data);
			// setTeacherData(res_data)
			// console.log(user)
		});

		if (get_data.role == "teacher") {
			jsonSrv.post("teacher", get_data).then((response) => {
				let res_data = response.data;
				console.log(res_data)
				setStuList(res_data);
				// setTeacherData(res_data)
				// teacher_data.res_data = res_data
				// console.log(stuList)
			});
		}
	}, []);

	if (role == "teacher") {
		return (
			<>
				<Teacher data={stuList} teacherData={user} />
				<ChPass data={user} />
			</>
		)
	} else {
		return (
			<>
				<Student data={user} />
				<ChPass data={user} />
			</>
		)
	}
}

export default Info;