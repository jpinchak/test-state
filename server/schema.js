module.exports = `type Query {
  color: Color
  test: Test
}

type Mutation {
  newColor(colorArg: String, aql: AQLInput): Color
}

type Subscription {
  updatedColor: UpdatedColorPayload
}

type UpdatedColorPayload {
  cssColor: String!
  id: ID!
  aql: AQL
}

type AQL {
  mutationSendTime: String,
  mutationReceived: String,
  subscriberReceived: String,
}

input AQLInput {
  mutationSendTime: String,
  mutationReceived: String,
  subscriberReceived: String,
}

type Color {
  id: ID!
  cssColor: String!
}

type Test {
  message: String!
}`;
