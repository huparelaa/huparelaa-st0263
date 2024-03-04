import { getConfig } from "./config/configStore.js";
import axios from "axios";
function login(){
    const API_URL = getConfig('SERVER_CENTRAL_ADDRESS');
    const PORT = getConfig('PORT');
    const IP_ADDRESS = getConfig('IP_ADDRESS');
    const url = `${API_URL}login`;
    const data = { ip: IP_ADDRESS, port: PORT };

    axios.post(url, data)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('Error: Could not connect to the central server');
            process.exit(0); // Termina el proceso del servidor
        });

}

function logout(req, res) {
    const API_URL = getConfig('SERVER_CENTRAL_ADDRESS');
    const PORT = getConfig('PORT');
    const IP_ADDRESS = getConfig('IP_ADDRESS');
    const url = `${API_URL}logout`;
    const data = { ip: IP_ADDRESS, port: PORT };

    axios.post(url, data)
        .then((axiosRes) => {
            console.log(axiosRes.data);
            res.send(axiosRes.data); // Envía una respuesta HTTP al cliente
            process.exit(0); // Termina el proceso del servidor
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor'); // Envía una respuesta de error
        });
}

export default { login, logout }