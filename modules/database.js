const low = require('lowdb');
const fsync = require('lowdb/adapters/FileSync');
const adapter = new fsync('database/positions.json');
const db = low(adapter);

const self = {
  setupDatabaseFile() {
    db
      .defaults({
        positions: [],
        user: {},
        count: 0
      })
      .write();

    db
      .get('positions')
      .push({
        id: 1,
        x: 0,
        y: 0,
        t: 0
      })
      .write()
  },
  
  getLatestPosition() {

  }
}

module.exports = self;
