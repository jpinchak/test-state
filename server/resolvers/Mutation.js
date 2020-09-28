function newColor(parent, args, { db }, info) {
  console.log('here at Mutation newColor query');
  db[0].cssColor = 'blue';
  return db[0];
}

module.exports = newColor;
