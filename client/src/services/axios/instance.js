import { SERVER_URL as url } from "../../config/config";
import axios from "axios";
import headers from "../../security/headers";

export default axios.create({
    baseURL: `${url}`,
    headers: headers()
})