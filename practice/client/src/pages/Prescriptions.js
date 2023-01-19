import { useState, useEffect } from "react";
import jsonSrv from "../services/jsonSrv";

function PrescriptionPage() {
	const [prescriptions, setPrescriptions] = useState([
		{
			ip_address: "",
			price: "",
		}
	]);

	useEffect(() => {
		let user_id = sessionStorage.getItem("user_id");
		let data = {
			user_id: user_id
		};
		jsonSrv.post("prescriptions", data).then((response) => {
			setPrescriptions(response.data);
		});
	}, []);

	return (
		<>
			<h1>Prescriptions</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{prescriptions.map((prescription) => (
						<tr>
							<td>{prescription.ip_address}</td>
							<td>{prescription.price}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td>Total</td>
						<td>{prescriptions.reduce((total, prescription) => total + prescription.price, 0)}</td>
					</tr>
				</tfoot>
			</table>
		</>
	);
}

export default PrescriptionPage;