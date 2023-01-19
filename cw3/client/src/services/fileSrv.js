import httpCommon from "../http-common";
class fileSrv {
    sendFile(data) {
        return httpCommon.post("/upload", data, {
            headers: {
                "content-type": 'multipart/form-data'
            }
        });
    }
};
export default new fileSrv();