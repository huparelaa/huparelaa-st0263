import express from 'express'
import dotenv from 'dotenv'
import coreManager from './coreManager.js'
import { loadConfigurations } from './config/configLoader.js'
import authManager from './authManager.js'

loadConfigurations()

dotenv.config()

const app = express()
app.use(express.json())

// Login to the central server
authManager.login()

app.get('/', (req, res) => {
    res.send('PServer is running')
});

app.post('/ps/upload', coreManager.uploadFile)
app.post('/ps/download', coreManager.downloadFile)
app.get('/ps/logout', authManager.logout)
export default app