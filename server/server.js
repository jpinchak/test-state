//const express = require('express');
const { GraphQLServer, PubSub } = require('graphql-yoga');
// const { execute, subscribe } = require('graphql');
// const { graphqlHTTP } = require('express-graphql');
// const { PubSub } = require('graphql-subscriptions');
// const { SubscriptionServer } = require('subscriptions-transport-ws');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
//const { buildSchema } = require('graphql');
const db = require('./db');

// Create a server:
//const app = express();

// Create root resolvers:
const rootValue = {
  Query,
  Mutation,
  Subscription,
};

// Create schema
//const schema = require('./schema');
//const expressSchema = buildSchema(schema);
// Create pubsub
const pubsub = new PubSub();

//*************************graphQL-yoga */
const server = new GraphQLServer({
  typeDefs: `./server/schema.graphql`,
  resolvers: rootValue,
  context: {
    pubsub,
    db,
  },
});

server.start(
  {
    endpoint: '/graphql',
    subscriptions: 'subscriptions',
    playground: '/playground',
  },
  () => console.log('Server is running on localhost:4000☄')
);

//*******************************express-graphQL */
//Use those to handle incoming requests:

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: expressSchema,
//     rootValue,
//     context: { pubsub: pubsub, db },
//     graphiql: true,
//   })
// );

// //Start the server:
// const server = app.listen(4000, () =>
//   console.log('Server started on port 4000')
// );

//Create subscription server
// SubscriptionServer.create(
//   { schema, rootValue, execute, subscribe },
//   {
//     server, // Listens for 'upgrade' websocket events on the raw server
//   }
// );
