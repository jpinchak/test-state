function newColor(parent, args, { db, pubsub }, info) {
  console.log(`ColorArg: ${args.colorArg}`);
  // console.log(`Context: ${hello}`);
  db[0].cssColor = args.colorArg;
  pubsub.publish('COLOR_MUTATED', { updatedColor: db[0] });
  return db[0];
}

module.exports = { newColor };
