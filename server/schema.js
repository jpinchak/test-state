module.exports = `type Query {
  color: Color
  test: Test
}

type Mutation {
  newColor(colorArg: String): Color
}

type Subscription {
  updatedColor: UpdatedColorPayload
}

type UpdatedColorPayload {
  cssColor: String!
  id: ID!
}

type Color {
  id: ID!
  cssColor: String!
}

type Test {
  message: String!
}`;
