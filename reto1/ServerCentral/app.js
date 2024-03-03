import express from 'express'
import dotenv from 'dotenv'
import auth from './auth.js'
import coreManager from './coreManager.js'

dotenv.config()

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Server Central is running')
});
app.post('/login', auth.login);
app.post('/logout', auth.logout);
app.post('/upload', coreManager.uploadFile);
app.get('/file/:name', coreManager.getFileByName);

export default app