import jsonSrv from "../services/jsonSrv";

function Form() {
	function handleSubmit() {
		jsonSrv.post("upload", {
			"file": "test"
		})
	}
	return (
		<>
			<form>
				<input type="file" />
				<button type="submit">Submit</button>
			</form>
		</>
	)
}

export default Form;