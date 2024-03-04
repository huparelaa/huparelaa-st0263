import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { getConfig } from "../config/configStore.js";
import { fileList, addFile } from '../fileList.js';
import path from 'path';
import { fileURLToPath } from 'url';
import coreUtil from '../utils/core.util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(__dirname, '..', 'protobufs', 'file_management.proto');

console.log(PROTO_PATH);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const fileManageProto = grpc.loadPackageDefinition(packageDefinition).file_management;
const server = new grpc.Server();

async function downloadFileHandler(call, callback) {
  const fileExists = fileList.includes(call.request.name);
  const message = fileExists ? "File downloaded successfully" : "File not found";
  const success = fileExists ? 1 : 0;

  callback(null, {
    name: call.request.name,
    message: message,
    success: success,
  });
}

async function uploadFileHandler(call, callback) {
  addFile(call.request.name);
  console.log(`File ${call.request.name} successfully registered.`);

  try {
    const response = await coreUtil.uploadToServer(call.request.name);
    if (response.data === "File uploaded") {
      callback(null, { name: call.request.name, message: "File successfully uploaded!", success: true });
    } else {
      callback(null, { name: call.request.name, message: "Error uploading file.", success: false });
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
}

server.addService(fileManageProto.FileTransferService.service, {
  DownloadFile: downloadFileHandler,
  UploadFile: uploadFileHandler
});

function startGRPCServer() {
  const port = getConfig('PORT_GRPC');
  console.log("GRPC PORT: ", port);
  const serverAddress = `0.0.0.0:${port}`;

  server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error('Error starting the gRPC server:', error);
      return;
    }
    server.start();
    console.log(`gRPC server listening on ${serverAddress}`);
  });
}

export { startGRPCServer };
