const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { defaultImage } = require('../secret');
const { Schema } = mongoose;

const emailValidator = (email) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: emailValidator,
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "minlength must be at least 6 characters long"],
    set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10));
  },
  image: {
    type: String,
    default: defaultImage
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;