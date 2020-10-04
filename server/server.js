const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');
const db = require('./db');
const http = require('http');
const path = require('path');
const Traql = require('./traql');
const traqlAudit = require('./traqlAudit')

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { execute, subscribe } = require('graphql');

// const { SubscriptionServer } = require('subscriptions-transport-ws');

const typeDefs = require('./schema');
const resolvers = { Mutation, Query, Subscription };
const analyticsRouter = require('./analyticsRouter');
const PORT = 4000;
const app = express();
app.use(express.json());

const pubsub = new PubSub();
const traql = new Traql(resolvers)
console.log('traql from server', JSON.stringify(traql));
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db, pubsub, traql },
});
setInterval(()=>traqlAudit(traql), 5000)

app.get('/', express.static(path.resolve(__dirname)));

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/analytics', (req, res, next)=>{req.traql = traql; return next()}, analyticsRouter);

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
