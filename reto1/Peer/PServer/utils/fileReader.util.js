import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function readConfigFile() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file_path = path.join(__dirname, '../config.json');

    try {
        const data = fs.readFileSync(file_path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

export default { readConfigFile };
