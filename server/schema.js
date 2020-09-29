const { buildSchema } = require('graphql');
const schema = buildSchema(
  `type Query {
  color: Color
  test: Test
}

type Mutation {
  newColor: Color
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
