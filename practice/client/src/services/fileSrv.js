import httpCommon from "../httpCommon";
class FileSrv {
    post(data) {
        return httpCommon.post("/upload", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}
export default new FileSrv();