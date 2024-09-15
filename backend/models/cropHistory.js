const mongoose=require("mongoose");

const cropHistorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    aadhar:{
        type:Number,
        required:true
    },
    history:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const crop_history=mongoose.model("crop_history",cropHistorySchema);

module.exports=crop_history