const mongoose=require("mongoose");

const profileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    aadhar: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    land_owned: {
      type: Number,
    },
    crops: {
      type: [String], // Array of crop names
      required: true,
    },
    livestock: {
      type: [String], // Array of livestock types
      required: false,
    },
  });
  
  const profile = mongoose.model("profile_Info", profileSchema);

  module.exports=profile