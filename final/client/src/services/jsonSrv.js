import httpCommon from "../httpCommon";
class jsonSrv {
    post(pageName, data) {
        data = JSON.stringify(data);
        return httpCommon.post(pageName, data);
    }
    get(pageName) {
        return httpCommon.get(pageName);
    }
}
export default new jsonSrv();