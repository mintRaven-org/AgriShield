const mongoose=require("mongoose");

const DiseaseTextSchema=new mongoose.Schema({
    diseaseName:{
        type:String,
        required:true
    },
    symptoms:{
        type:String,
        required:true
    }
})

const DiseaseText=mongoose.model("DiseaseText",DiseaseTextSchema);

module.exports=DiseaseText