// fileList.js
let fileList = [];

function addFile(fileName) {
    if (!fileList.includes(fileName)) {
        fileList.push(fileName);
    }
}

export { fileList, addFile };
