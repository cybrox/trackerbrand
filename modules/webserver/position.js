const database = require('./../database');
const utility = require('./_utility');
const url = require('url');
const fs = require('fs');

const self = {
  setup(_req, resp) {
    database.setupDatabaseFile();
    resp.writeHead(200).end('Set up new database');
  },

  show(_req, resp) {
    resp.writeHead(200);
    fs.createReadStream(`interface/index.html`).pipe(resp);
  },

  getHistory(req, resp) {
    const link = url.parse(req.url, {parseQueryString: true});
    const size = link.query.n || 20;
    const positions = database.getPositionHistory(size);
    const payload = {data: {position: positions}};

    resp.writeHead(200).end(JSON.stringify(payload));
  },

  getLatest(_req, resp) {
    const position = database.getLatestPosition();
    const payload = {data: {position: position[0]}};

    resp.writeHead(200).end(JSON.stringify(payload));
  },

  add(req, resp) {
    utility.withBody(req, resp, (req, resp, body) => {
      database.addNewPosition(body);
      resp.writeHead(200).end('Saved new position');
    });
  },
};

module.exports = self;
