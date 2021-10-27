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
    followers: [User]
  }

  type Mutation {
    addUser(username: String, email: String!, password: String!): User
    addPet(name: String!, type: String!, breed: String): Pet
    followUser(username: String!): User
    unfollowUser(username: String!): User
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;