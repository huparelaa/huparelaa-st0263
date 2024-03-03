import PEERS_LIST from './peersList.js'
// import uuid
import { v4 as uuidv4 } from 'uuid';

function login(req, res) {
    // Extraer IP y puerto del cuerpo de la solicitud
    const { ip, port } = req.body;

    if(checkLogIn(ip, port)){
        return res.json('Already logged in')
    }

    // Agregar el par a la lista con el IP y puerto proporcionados
    PEERS_LIST.push({
        id: uuidv4(), // Asumiendo que uuidv4() ha sido importado correctamente
        ip: ip,
        port: port, // Usar el puerto recibido en lugar del valor fijo
        files: []
    });

    console.log(PEERS_LIST);
    res.json(`Login ${ip}:${port}`); // Devolver respuesta con IP y puerto
}


function logout(req, res) {
    // print ip
    const { ip, port } = req.body
    console.log(ip, port)
    const peer = checkLogIn(ip, port)
    console.log(peer)
    // check if peer is in list
    if(!peer){
        return res.json('Not logged in')
    }

    // remove peer from list using splice
    const index = PEERS_LIST.indexOf(peer)
    PEERS_LIST.splice(index, 1)
    console.log(PEERS_LIST)
    res.json('Logout')
}

// Is the peer logged in?
function checkLogIn(ip, port) {
    const peer = PEERS_LIST.find(peer => peer.ip === ip && peer.port === port);
    if (peer) {
        return peer;
    }
    return false;
}

export default { login, logout, checkLogIn}