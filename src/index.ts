import * as http from 'http'
import 'dotenv/config'

import app from './app'
import db from './models'
import { normalizePort, onError, onListening } from './library/Server/server';


const server = http.createServer(app)
const port   = normalizePort(process.env.PORT || 3000)
 
db.sequelize.sync()
    .then(() => {
        server.listen(port)
        server.on('error', onError(server))
        server.on('listening', onListening(server))
    })
