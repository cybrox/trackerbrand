const database = require('./../database');

const self = {
  setup(request, response) {
    database.setupDatabaseFile();
    response.writeHead(200).end('Set up new database');
  },

  show(request, response) {

  },

  get(request, response) {

  },

  add(request, response) {
    
  },
};

module.exports = self;
