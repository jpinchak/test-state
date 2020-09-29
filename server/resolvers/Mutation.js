const db = require('../db');

const Mutation = {
  newColor(parent, args, ctx, info) {
    db[0].cssColor = 'blue';
    return db[0];
  },
};
module.exports = Mutation;
