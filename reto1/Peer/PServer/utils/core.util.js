import axios from "axios";
import { getConfig } from '../config/configStore.js';
import { fileList } from "../fileList.js";

async function uploadToServer(fileName) {
    const API_URL = getConfig('SERVER_CENTRAL_ADDRESS');
    const url = `${API_URL}upload`;
    const file = fileName;
    try {
        const response = await axios.post(url, { file });
        return response;
    } catch (error) {
        console.log(error.response.data.error);
        throw error.response.data.error;
    }
}

async function downloadFromServer(fileName) {
    return new Promise((resolve, reject) => {
        resolve({ data: { message: "File downloaded" } });
    });
}

function storeFile(file) {
    fileList.push(file);
}

function getFiles() {
    return fileList;
}

export default { uploadToServer, downloadFromServer, storeFile, getFiles}