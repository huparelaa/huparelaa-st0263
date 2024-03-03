import PEERS_LIST from "../peersList.js"
function uploadFile(ip, fileReceived) {
    const peer = PEERS_LIST.find(peer => peer.ip === ip)
    if (!peer) {
        return 'Not logged in'
    }
    if (!fileReceived) {
        return 'No file uploaded'
    }

    const file = peer.files.find(file => file === fileReceived)
    if (file) {
        return 'File already uploaded'
    }

    peer.files.push(fileReceived)
    console.log(PEERS_LIST)
    return 'File uploaded'
}

function getFileByName(name) {
    // return ip list of peers that have file
    const ips = []
    PEERS_LIST.forEach(peer => {
        const file = peer.files.find(file => file === name)
        if (file) {
            ips.push(peer.ip)
        }
    })
    return ips
}

function roundRobin() {
    // return ip of peer
    let index = 0
    return () => {
        if (index === PEERS_LIST.length) {
            index = 0
        }
        return PEERS_LIST[index++].ip
    }
}

export default { uploadFile, getFileByName, roundRobin}
