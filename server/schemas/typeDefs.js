const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Pet {
    name: String!
    type: String!
    breed: String
  }

  type User {
    username: String!
    email: String!
    pets: [Pet]!
    followers: [User]!
    following: [User]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
  
  }

  type Mutation {
    addUser(username: String, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;