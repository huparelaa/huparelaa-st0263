import PEERS_LIST from "../peersList.js"
function uploadFile(ip, port, fileReceived) {
    const peer = PEERS_LIST.find(peer => peer.ip === ip && peer.port === port)
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
        index++
        return {
            ip: PEERS_LIST[index-1].ip,
            port: PEERS_LIST[index-1].port
        }
    }
}

function getAvailablePeer(ip, port) {
    // Return available peer, but not the one that is asking
    const availablePeers = PEERS_LIST.filter(peer => peer.ip !== ip || peer.port !== port)
    if (availablePeers.length === 0) {
        return 'No available peers'
    }
    // Order by number of files
    availablePeers.sort((a, b) => a.files.length - b.files.length)

    return availablePeers[0]
}

export default { uploadFile, getFileByName, roundRobin, getAvailablePeer }
