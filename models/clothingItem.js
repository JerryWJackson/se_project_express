const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

const clothingItem = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required!"],
      minLength: [2, "You must enter a minimum of 2 characters"],
      maxLength: [30, "You must enter a maximum of 30 characters"],
    },
    weather: {
      type: String,
      required: [true, "The weather-type field is required!"],
      enum: ["hot", "warm", "cold"],
    },
    imageUrl: {
      type: String,
      required: [true, "The image URL field is required!"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "You must enter a valid URL",
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: user,
    },
    likes: [
      {
        type: [mongoose.Types.ObjectId],
        ref: user,
        default: [],
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("clothingItems", clothingItem);
