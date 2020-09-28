const db = require('../db');

function color() {
  return db[0];
}

module.exports = { color };
