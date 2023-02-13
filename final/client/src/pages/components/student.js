function Student({ data }) {
	return (
		<>
			<h1>student</h1>
			<table>
				<thead>
					<tr>
						<td>
							full name
						</td>
						<td>
							email
						</td>
						<td>
							gpa
						</td>
						<td>
							teacherid
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							{data.fname} {data.lname}
						</td>
						<td>
							{data.email}
						</td>
						<td>
							{data.gpa}
						</td>
						<td>
							{data.teacherid}
						</td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default Student;