function newBlue(parent, args, { db, pubsub }, info) {
  // console.log(`testArgs: ${args.testArgs}`);
  // console.log(`Context: ${hello}`);
  db[0].cssColor = 'blue';
  console.log(db[0]);
  pubsub.publish('COLOR_MUTATED', db[0]);
  return db[0];
}

function newRed(parent, args, { db }, info) {
  db[0].cssColor = 'red';
  return db[0];
}

module.exports = { newBlue, newRed };
