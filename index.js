const WebServer = require('./modules/webserver');
const WEB_SERVER_PORT = 8080;

console.info(`Trackerbrand listening on ${WEB_SERVER_PORT}`)
WebServer.listenOnPort(WEB_SERVER_PORT);
