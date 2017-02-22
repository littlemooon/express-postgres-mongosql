import http from 'http'

import config from './server/config'
import app from './server/app'

app.set('port', config.app.port)

const server = http.createServer(app)
server.listen(config.app.port, () => console.log('Listening on port', config.app.port))
