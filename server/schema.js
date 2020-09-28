const { buildSchema } = require('graphql');
const schema = buildSchema(
  `type Query {
  color: Color!
  id: String
}

type Mutation {
  newColor: Color
}

type Color {
  id: ID!
  cssColor: String!
}`
);

module.exports = schema;
