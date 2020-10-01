const Subscription = {
  updatedColor: {
    subscribe(parent, args, { pubsub, db }) {
      return pubsub.asyncIterator('COLOR_MUTATED');
    },
  },
  updatedNumber: {
    subscribe(parent, args, { pubsub, db }) {
      return pubsub.asyncIterator('NUMBER_MUTATED');
    },
  },
};

module.exports = Subscription;
