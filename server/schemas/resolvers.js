const { AuthenticationError } = require('apollo-server-express');
const { User, Pet } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = User.findOne({username: args.username})
      .select('-__v -password')
      .populate('pets')
      .populate('followers')
      .populate('following');
      return user;
    },
    followers: async(parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({id: context.user._id})
        .populate('followers');
        return user.followers;
      }
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    addPet: async (parent, args, context) => {
      if(context.user) {
        const pet = await Pet.create(args);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: pet._id } },
          { new: true }
        );

        return pet;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    followUser: async (parent, { username }, context) => {
      if (context.user) {
        const followUser = await User.findOne({username: username});
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { following: followUser._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          { _id: followUser._id },
          { addToSet: { followers: context.user._id } }
        );

        return await User.findOne({username: context.user.username})
          .select('-__v -password')
          .populate('pets')
          .populate('followers')
          .populate('following');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    unfollowUser: async (parent, { username }, context) => {
      if (context.user) {
        const user = await User.findOne({username: username});
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pullAll: { following: [user._id] } }
        )
        return await User.findOne({username: context.user.username})
        .select('-__v -password')
        .populate('pets')
        .populate('followers')
        .populate('following');
      }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;