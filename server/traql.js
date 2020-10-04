function Traql(resolvers) {
  this.subResolvers = Object.keys(resolvers.Subscription).length;
}

module.exports = Traql;
