const db = require('../db');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const Subscription = {
  updatedColor: {
    subscribe: () => pubsub.asyncIterator('COLOR_MUTATED'),
  },
};

module.exports = Subscription;
