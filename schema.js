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
    getCurrentUser: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }
`;
