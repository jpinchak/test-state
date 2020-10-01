module.exports = `type Query {
  color: Color
}


type Mutation {
  newColor(colorArg: String, aql: AQLInput): Color
  newLuckyNumber(numberArg: Int, aql: AQLInput): LuckyNumber
}

type Subscription {
  updatedColor: UpdatedColorPayload
  updatedNumber: UpdatedNumberPayload
}

type UpdatedColorPayload {
  cssColor: String!
  id: ID!
  aql: AQL
}

type UpdatedNumberPayload {
  luckyNum: Int
  aql: AQL
}

type AQL {
  mutationSendTime: String,
  mutationReceived: String,
  subscriberReceived: String,
  mutationId: ID,
  resolver: String,
}

input AQLInput {
  mutationSendTime: String,
  mutationReceived: String,
  subscriberReceived: String,
  mutationId: ID,
  resolver: String,
}

type Color {
  id: ID!
  cssColor: String!
}

type LuckyNumber {
  luckyNum: Int
}
`;
