const low = require('lowdb');
const fsync = require('lowdb/adapters/FileSync');
const adapter = new fsync('database/database.json');
const database = low(adapter);

const self = {
  setupDatabaseFile() {
    database
      .defaults({
        positions: [],
        user: {},
        count: 0
      })
      .write();

    self.addNewPosition({
      x: 52.696111,
      y: 5.287278
    });
  },

  getPositionHistory(size) {
    return database
      .get('positions')
      .sortBy('id')
      .reverse()
      .take(size)
      .value()
  },

  getLatestPosition() {
    return database
      .get('positions')
      .sortBy('id')
      .reverse()
      .take(1)
      .value()
  },

  addNewPosition(pos) {
    const count = database
      .get('positions')
      .size()
      .value();

    database
      .get('positions')
      .push({
        id: (count + 1),
        x: pos.x || 0,
        y: pos.y || 0,
        t: pos.t || 0,
        u: pos.u || "",
        tt: self.currentTimestamp()
      })
      .write();

    database
      .update('count', n => n + 1)
      .write();
  },

  currentTimestamp() {
    return Math.round((new Date()).getTime() / 1000);
  }
}

module.exports = self;
