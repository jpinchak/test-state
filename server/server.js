const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const db = require('./db');

// Create a server:
const app = express();

const resolvers = {
  ...Query,
  ...Mutation,
  ...Subscription,
};

// Create root resolvers:
const rootValue = resolvers;

const schema = require('./schema');

//*******************************express-graphQL */
//Use those to handle incoming requests:
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

//Start the server:
app.listen(4000, () => console.log('Server started on port 4000'));
