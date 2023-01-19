import fileSrv from '../services/fileSrv';
function Home() {
    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('dirname', e.target.dirname.value);
        formData.append('filename00', e.target.filename00.value);
        formData.append('filename01', e.target.filename01.value);
        formData.append('filename02', e.target.filename02.value);
        fileSrv.sendFile(formData)
            .then(res => {
                console.log(res);
            })
    }
    return (
        <form
            onSubmit={submit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <div>
                <label htmlFor="dirname">Dirname</label>
                <input type="text" name="dirname" />
            </div>
            <div>
                <label htmlFor="file00">File</label>
                <input type="text" name="filename00" />
                <input type="file" name="file00" />
            </div>
            <div>
                <label htmlFor="file01">File</label>
                <input type="text" name="filename01" />
                <input type="file" name="file01" />
            </div>
            <div>
                <label htmlFor="file02">File</label>
                <input type="text" name="filename02" />
                <input type="file" name="file02" />
            </div>
            <button type="submit">Upload</button>
        </form>
    )
}
export default Home;