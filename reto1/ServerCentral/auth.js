import PEERS_LIST from './peersList.js'
// import uuid
import { v4 as uuidv4 } from 'uuid';

function login(req, res) {
    // Extraer IP y puerto del cuerpo de la solicitud
    const { ip, port } = req.body;

    // Verificar si el par ya está en la lista
    const peer = PEERS_LIST.find(peer => peer.ip === ip && peer.port === port);
    if (peer) {
        return res.send('Already logged in');
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
    const { ip } = req.body

    // check if peer is in list
    const peer = PEERS_LIST.find(peer => peer.ip === ip)
    if (!peer) {
        return res.send('Not logged in')
    }

    // remove peer from list using splice
    const index = PEERS_LIST.indexOf(peer)
    PEERS_LIST.splice(index, 1)
    console.log(PEERS_LIST)
    res.json('Logout')
}

export default { login, logout }