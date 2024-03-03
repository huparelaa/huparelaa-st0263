import uploadUtil from './utils/upload.util.js'

const getNextPeerAddress = uploadUtil.roundRobin();

function uploadFile(req, res) {
    const { file } = req.body
    const { ip, port } = getNextPeerAddress();
    const response = uploadUtil.uploadFile(ip, port, file)
    res.json(response)
}

function getFileByName(req, res) {
    const { name } = req.params
    const file = uploadUtil.getFileByName(name)
    res.json(file)
}

export default { uploadFile, getFileByName }