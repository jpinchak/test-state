function newColor(parent, args, { db, pubsub }, info) {
  console.log('entered newColor mutation resolver');
  db[0].cssColor = args.colorArg;
  pubsub.publish('COLOR_MUTATED', {
    updatedColor: {
      ...db[0],
      aql: {
        mutationSendTime: args.aql.mutationSendTime,
        mutationReceived: new Date(),
        subscriberReceived: '',
      },
    },
  });
  return db[0];
}

module.exports = { newColor };
