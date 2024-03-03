import { getConfig } from "./config/configStore.js";
import axios from "axios";
function login(){
    const API_URL = getConfig('SERVER_CENTRAL_ADDRESS');
    const PORT = process.env.PORT;
    const IP_ADDRESS = getConfig('IP_ADDRESS');
    const url = `${API_URL}login`;
    const data = { ip: IP_ADDRESS, port: PORT };

    axios.post(url, data)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

export default { login }