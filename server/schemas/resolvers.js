const { AuthenticationError } = require('apollo-server-express');
const { User, Pet } = require('../models');
const { signToken } = require('../utils/auth');
const {
  GraphQLUpload
} = require('graphql-upload');
const { createWriteStream } = require('fs');
const path = require('path');
const { uploadFile, deleteFileS3 } = require('../s3');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = await User.findOne({username: args.username})
      .select('-__v -password')
      .populate('pets');
      return user;
    }
  },
  Upload: GraphQLUpload,
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
    uploadFile: async (parent, { file } ) => {
      const { createReadStream, filename } = await file;
      await new Promise(res => {
        createReadStream()
          // .pipe(createWriteStream(path.join(__dirname, "http://localhost:3001/images", filename)))
          .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
          .on('close', res)
      });
      let name = filename.replace(/\s/g, '');
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = mm + '-' + dd + '-' + yyyy;
      name = today + '-' + name;
      const result = await uploadFile(name, createReadStream);
      return  result.Location; 
    },
    deleteFile: async (parent, { fileKey }, context) => {
      await deleteFileS3(fileKey);
      return '?';
    },
    editUser: async (parent, args, context) => {
      if (context.user) {

        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {
            username: args.username,
            email: args.email
          },
          {new: true}
        )
        .select('-__v -password')
        .populate('pets');
      }
    },
    deleteUser: async (parent, args, context) => {
      if(context.user) {
        return User.findByIdAndDelete(
          {_id: context.user._id}
        );
      }
    },
    editPet: async (parent, args, context) => {
      if (context.user) {
        const pet = await Pet.findByIdAndUpdate(
          {_id: args._id},
          args,
          {new: true}
        );
        return await User.findOne(
          {username: context.user.username},
        )
        .populate('pets');
      }
    },
    deletePet: async (parent, {_id}, context) => {
      if(context.user) {
        return await Pet.findByIdAndDelete(_id);
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