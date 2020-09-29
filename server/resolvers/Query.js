const Query = {
  color(parent, args, { db }) {
    return db[0];
  },
};
module.exports = Query;
