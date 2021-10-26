const { Schema, model } = require('mongoose');


const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    breed: {
        type: String,
        required: false,
        trim: true
    }
  }
);

const Pet = model('Pet', petSchema);

module.exports = Pet;