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
        enum: ["Dog", "Cat"]
    },
    breed: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
      type: String,
      required: true,
      trim: true
    },
    vaccinations: {
        type: String,
        required: false
    },
    medications: {
        type: String,
        required: false
    },
    photo: {
      type: String
    }  
  }
);

const Pet = model('Pet', petSchema);

module.exports = Pet;