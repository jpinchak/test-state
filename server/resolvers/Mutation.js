function newColor(parent, args, { db, pubsub, traql }, info) {
  db.color.cssColor = args.colorArg;
  pubsub.publish('COLOR_MUTATED', {
    updatedColor: {
      ...db.color,
      aql: {
        ...args.aql,
        mutationReceived: new Date(),
      },
    },
  });
  traql[args.aql.mutationId] = {
    openedTime: Date.now(),
    expectedNumberOfAqls: pubsub.subscriptions,
    aqlsReceivedBack: [],
  };

  // trigger new traql (an object)
  // traql has mutation id from AQL
  // number of current subscribers
  // if x amt of time passes without returnAQL, generate error and send to db
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
