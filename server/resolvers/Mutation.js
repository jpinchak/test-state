const { newAql, newTraqlEntry } = require('../aql');
function newColor(parent, args, { db, pubsub, traql }, info) {
  db.color.cssColor = args.colorArg;
  pubsub.publish('COLOR_MUTATED', {
    updatedColor: {
      ...db.color,
      aql: newAql(args),
    },
  });
  // create new traql entry
  newTraqlEntry(traql, args, pubsub);
  //console.log("CLIENT IP ADDRESS", context.request.connection.remoteAddress)
  return db.color;
}

function newLuckyNumber(parent, args, { db, pubsub }, info) {
  db.number.luckyNum = args.numberArg;
  pubsub.publish('NUMBER_MUTATED', {
    updatedNumber: {
      ...db.number,
      aql: {
        ...args.aql,
        mutationReceived: new Date(),
      },
    },
  });
  return db.number;
}

module.exports = { newColor, newLuckyNumber };
