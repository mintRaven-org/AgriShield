const mongoose =require("mongoose");

    const doctorSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        id:{
            type:Number,
            unique:true
        },
        contact:{
            type:Number,
            required:true
        },
        qualification:{
            type:String,
            required:true
        },
        info:{
            type:String,
        }
    });

    const doctorInfo=mongoose.model("Doctor_Info",doctorSchema);
    module.exports=doctorInfo;
