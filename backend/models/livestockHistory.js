const mongoose=require("mongoose");

const livestockHistorySchema=new mongoose.Schema({
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
const livestock_history=mongoose.model("livestock_history",livestockHistorySchema);

module.exports=livestock_history