const database = require('./../database');
const utility = require('./_utility');

const self = {
  setup(_req, resp) {
    database.setupDatabaseFile();
    resp.writeHead(200).end('Set up new database');
  },

  show(_req, resp) {

  },

  get(_req, resp) {
    const position = database.getLatestPosition();
    const payload = {data: {position}};

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
