const db = require('../db');
const Query = {
  color() {
    return db[0];
  },
  test() {
    return { message: 'hello' };
  },
};
module.exports = Query;
