const db = require('../db');

const Mutation = {
  newBlue(parent, args, ctx, info) {
    db[0].cssColor = 'blue';
    return db[0];
  },

  newRed(parent, args, ctx, info) {
    db[0].cssColor = 'red';
    return db[0];
  },
};
module.exports = Mutation;
