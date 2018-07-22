export default `
  type User {
    _id: String!
    username: String!
    email: String!
    createdAt: String
    updatedAt: String 
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(email: String!, username: String!): User!
  }
`;
