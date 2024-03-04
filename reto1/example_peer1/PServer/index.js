import app from './app.js';
import { getConfig } from './config/configStore.js';
import { startGRPCServer } from './grpc/server_grpc.js';
const PORT = getConfig('PORT');

startGRPCServer();
app.listen(PORT, () => {
  console.log("PServer is running on port: " + PORT)
});
