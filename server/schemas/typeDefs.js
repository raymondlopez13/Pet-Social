const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload 
  
  type Pet {
    _id: ID!
    name: String!
    type: String!
    breed: String!
    weight: String!
    vaccinations: String
    medications: String
    photo: String
  }

  type User {
    username: String!
    email: String!
    password: String!
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
    addUser(username: String!, email: String!, password: String!): User
    addPet(name: String!, type: String!, breed: String!, weight: String!, vaccinations: String, medications: String, photo: String): Pet
    editUser(username: String!, email: String!): User
    deleteUser: User
    deletePet(_id: ID!): Pet
    editPet(_id: ID!, name: String, type: String, breed: String, weight: String, vaccinations: String, medications: String, photo: String): User
    login(username: String!, password: String!): Auth
    uploadFile(file: Upload!): String
    deleteFile(fileKey: String!): String!
  }
`;

module.exports = typeDefs;