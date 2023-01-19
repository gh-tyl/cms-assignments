import fileSrv from "../services/fileSrv";

function Dev() {
	function handleSubmit(e) {
		e.preventDefault();
		console.log(e.target);
		// const data = {
		// 	test_text: e.target.test_text.value,
		// 	file: e.target.file.files[0]
		// }
		let data = new FormData();
		data.append("test_text", e.target.test_text.value);
		data.append("file", e.target.file.files[0]);
		fileSrv.post(data)
			.then(response => {
				console.log(response);
			})
			.catch(e => {
				console.log(e);
			});
	}

	return (
		<>
			<h1>Dev</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="test_text" />
				<input type="file" name="file" />
				<button type="submit">Submit</button>
			</form>
		</>
	)
}

export default Dev;