import app from './app.js';
import { getConfig } from './config/configStore.js';
const PORT = getConfig('PORT');

app.listen(PORT, () => {
  console.log("PServer is running on port: " + PORT)
});
