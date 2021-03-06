const database = require('./../database');
const utility = require('./_utility');
const url = require('url');
const fs = require('fs');

const self = {
  setup(_req, resp) {
    database.setupDatabaseFile();
    resp.writeHead(200);
    resp.end('Set up new database');
  },

  show(_req, resp) {
    resp.setHeader('Content-Type', 'text/html');
    resp.writeHead(200);
    fs.createReadStream(`interface/index.html`).pipe(resp);
  },

  getHistory(req, resp) {
    const link = url.parse(req.url, {parseQueryString: true});
    const size = link.query.n || 20;
    const positions = database.getPositionHistory(size);
    const payload = {data: {position: positions}};

    resp.writeHead(200);
    resp.end(JSON.stringify(payload));
  },

  getLatest(_req, resp) {
    const position = database.getLatestPosition();
    const payload = {data: {position: position[0]}};

    resp.writeHead(200);
    resp.end(JSON.stringify(payload));
  },

  addLocal(req, resp) {
    utility.withBody(req, resp, (req, resp, body) => {
      if (!self.validatePayload(body)) {
        resp.writeHead(400);
        resp.end('Bad request');
        return;
      }

      database.addNewPosition(body);
      resp.writeHead(200);
      resp.end('Saved new position');
    });
  },

  addRemote(req, resp) {
    utility.withBody(req, resp, (req, resp, body) => {
      if (body.app_id != 'segelbrandgps') {
        resp.writeHead(401);
        resp.end('Unauthorized');
        return;
      }

      if (!body.payload_fields || !body.payload_fields.t) {
        resp.writeHead(400);
        resp.end('Bad request');
        return;
      }

      if (!self.validatePayload(body.payload_fields)) {
        resp.writeHead(400);
        resp.end('Bad request');
        return;
      }

      database.addNewPosition(body.payload_fields);
      resp.writeHead(200);
      resp.end('Saved new position');
    });
  },


  validatePayload(payload) {
    if (!payload.x) return false;
    if (!payload.y) return false;
    if (!payload.t) return false;
    return true;
  }
};

module.exports = self;
