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
    resolver: args.aql.resolver,
    openedTime: Date.now(),
    expectedNumberOfAqls: Math.floor(Object.keys(pubsub.subscriptions).length/traql.subResolvers),
    aqlsReceivedBack: []
  };
  console.log('traql from within Mutation resolver', JSON.stringify(traql))
  console.log("CLIENT IP ADDRESS", context.request.connection.remoteAddress)

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
