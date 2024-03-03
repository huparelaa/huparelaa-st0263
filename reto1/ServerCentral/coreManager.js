import uploadUtil from './utils/upload.util.js'
import auth from './auth.js';
import PEERS_LIST from './peersList.js';

const getNextPeerAddress = uploadUtil.roundRobin();

function uploadFile(req, res) {
    const { file, ip, port } = req.body; // Extrae ip y port del cuerpo de la solicitud
    const response = uploadUtil.uploadFile(ip, port, file);
    res.json(response);
}

function getFileByName(req, res) {
    const { name } = req.params
    const file = uploadUtil.getFileByName(name)
    res.json(file)
}

function getAvailablePeer(req, res) {
    const { ip, port } = req.body;
    const peer = auth.checkLogIn(ip, port);
    if (!peer) {
        return res.json('Not logged in')
    }
    const availablePeer = uploadUtil.getAvailablePeer(ip, port);
    res.json(availablePeer);

}

export default { uploadFile, getFileByName, getAvailablePeer }