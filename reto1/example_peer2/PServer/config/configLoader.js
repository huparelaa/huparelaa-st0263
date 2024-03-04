// configLoader.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { setConfig } from './configStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadConfigurations = () => {
  const filePath = path.join(__dirname, '../config.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonConfig = JSON.parse(data);
    // IP_ADDRESS
    setConfig('IP_ADDRESS', jsonConfig.IP_ADDRESS);
    // SERVER_CENTRAL_ADDRESS
    setConfig('SERVER_CENTRAL_ADDRESS', jsonConfig.SERVER_CENTRAL_ADDRESS);
    // PORT
    setConfig('PORT', jsonConfig.PORT);
    // PORT_GRPC
    setConfig('PORT_GRPC', jsonConfig.PORT_GRPC);
  } catch (error) {
    console.error('Failed to load configurations:', error);
  }
};
