const { AuthenticationError } = require('apollo-server-express');
const { User, Pet } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = User.findOne({username: args.username});
      return user;
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = User.create(args);
      return user;
    }
  }
};

module.exports = resolvers;