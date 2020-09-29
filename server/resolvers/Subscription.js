const Subscription = {
  updatedColor: {
    subscribe(parent, args, { pubsub, db }) {
      return pubsub.asyncIterator('COLOR_MUTATED');
    },
  },
};

module.exports = Subscription;
