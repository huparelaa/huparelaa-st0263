import uploadUtil from './utils/upload.util.js'

const getNextPeerIP = uploadUtil.roundRobin();

function uploadFile(req, res) {
    const { file } = req.body
    const ip = getNextPeerIP();
    const response = uploadUtil.uploadFile(ip, file)
    res.json(response)
}

function getFileByName(req, res) {
    const { name } = req.params
    const file = uploadUtil.getFileByName(name)
    res.json(file)
}

export default { uploadFile, getFileByName }