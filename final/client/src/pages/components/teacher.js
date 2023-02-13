import { useState, useEffect } from "react";

function Teacher({ data, teacherData }) {
	console.log(teacherData);
	const [howManyStuFindJob, setHowManyStuFindJob] = useState(0);
	const [max, setMax] = useState(0);
	const [min, setMin] = useState(0);
	const [avg, setAvg] = useState(0);

	useEffect(() => {
		console.log(data)
		let max = data[0].gpa
		let min = data[0].gpa
		let sum = 0
		let jobCount = 0
		data.map((user) => {
			if (user.findJob) {
				jobCount++;
			}
			if (max < user.gpa) {
				max = user.gpa;
			}
			if (min > user.gpa) {
				min = user.gpa;
			}
			sum += user.gpa;
		})
		setHowManyStuFindJob(jobCount);
		setMax(max);
		setMin(min);
		let avg = sum / data.length
		console.log(avg)
		setAvg(avg)
	});

	return (
		<>
			<h1>Teacher</h1>
			<table>
				<thead>
					<tr>
						<td>
							full name
						</td>
						<td>
							email
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							{teacherData.fname} {teacherData.lname}
						</td>
						<td>
							{teacherData.email}
						</td>
					</tr>
				</tbody>
			</table>
			<h1>Student Info</h1>
			<table>
				<thead>
					<tr>
						<td>
							id
						</td>
						<td>
							full name
						</td>
						<td>
							email
						</td>
						<td>
							findJob
						</td>
						<td>
							gpa
						</td>
					</tr>
				</thead>
				<tbody>
					{
						data.map((user) => {
							return (
								<tr>
									<td>{user.studentid}</td>
									<td>{user.fname} {user.lname}</td>
									<td>{user.email}</td>
									<td>{user.findJob}</td>
									<td>{user.gpa}</td>
								</tr>
							)
						})
					}
				</tbody>
				<tfoot>
					{/* avg */}
					<tr>
						<td colSpan={4}>
							Max for gpa
						</td>
						<td>
							{max}
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							Min for gpa
						</td>
						<td>
							{min}
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							Avg for gpa
						</td>
						<td>
							{avg}
						</td>
					</tr>
					<tr>
						<td colSpan={4}>
							howManyStuFindJob
						</td>
						<td>
							{howManyStuFindJob}
						</td>
					</tr>
				</tfoot>
			</table>
		</>
	)
}

export default Teacher;