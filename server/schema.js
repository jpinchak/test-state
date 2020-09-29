const { buildSchema } = require('graphql');
const schema = buildSchema(
  `type Query {
  color: Color
  test: Test
}

type Mutation {
  newBlue: Color
  newRed: Color
}

type Subscription {
  updatedColor: Color
}

type Color {
  id: ID!
  cssColor: String!
}

type Test {
  message: String!
}
`
);

module.exports = schema;
