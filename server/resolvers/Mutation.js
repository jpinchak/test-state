const newAql = require('../aql');
const newTraqlEntry = require('../newTraqlEntry');

// interface AqlArgInput {
//   mutationSendTime: string;
//   mutationReceived: string;
//   subscriberReceived: string;
//   mutationId: string;
//   resolver: string;
//   userToken: string;
// }

// interface NewColorArg {
//   colorArg: string;
//   aql: AqlArgInput;
// }

function newColor(parent, args, { db, pubsub, traql }, info) {
  db.color.cssColor = args.colorArg;
  pubsub.publish('COLOR_MUTATED', {
    //create a helper function that takes payload object and returns payload obj including the updated Aql with current time stamped on it.
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

function newLuckyNumber(parent, args, { db, pubsub, traql }, info) {
  db.number.luckyNum = args.numberArg;
  pubsub.publish('NUMBER_MUTATED', {
    updatedNumber: {
      ...db.number,
      aql: newAql(args),
    },
  });
  newTraqlEntry(traql, args, pubsub);
  return db.number;
}

module.exports = { newColor, newLuckyNumber };
