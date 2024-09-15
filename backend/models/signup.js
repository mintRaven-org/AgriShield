const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    aadhar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  const signUp = mongoose.model("SignUp_Info", signUpSchema);

  module.exports = signUp;