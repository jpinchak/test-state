function newTraqlEntry(traql, args, pubsub) {
  traql[args.aql.mutationId] = {
    resolver: args.aql.resolver,
    openedTime: Date.now(),
    expectedNumberOfAqls: Math.floor(
      Object.keys(pubsub.subscriptions).length / traql.subResolvers
    ),
    aqlsReceivedBack: [],
    userToken: args.aql.userToken
  };
}

function newAql(args) {
  const aql = {
    ...args.aql,
    mutationReceived: new Date(),
  };
  return aql;
}

module.exports = { newTraqlEntry, newAql };
