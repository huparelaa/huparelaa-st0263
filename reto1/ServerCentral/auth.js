import PEERS_LIST from './peersList.js'
// import uuid
import { v4 as uuidv4 } from 'uuid';

function login(req, res) {
    // print ip
    const { ip } = req.body

    // check if peer is already in list
    const peer = PEERS_LIST.find(peer => peer.ip === ip)
    if (peer) {
        return res.send('Already logged in')
    }

    // add peer to list
    PEERS_LIST.push({
        id: uuidv4(),
        ip: ip,
        port: 3000,
        files: []
    })

    console.log(PEERS_LIST)
    res.json('Login' + ip)
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