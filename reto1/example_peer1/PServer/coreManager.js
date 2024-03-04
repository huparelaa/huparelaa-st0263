import coreUtil from './utils/core.util.js';

function uploadFile(req, res) {
    const { file } = req.body;
    try {
        coreUtil.uploadToServer(file)
            .then(response => {
                if (response.data === "File uploaded") {
                }
                res.status(200).json(response.data);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function downloadFile(req, res) {
    const { fileName } = req.body;
    try {
        coreUtil.downloadFromServer(fileName)
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { uploadFile, downloadFile }