const mongoose = require('mongoose');

const DiseaseImgSchema=new mongoose.Schema({
    //diseaseName:{
    //    type:String,
    //    required:true
    //    },
    image: {
        type: Buffer, // This stores the image as binary data
        required: true
    },
    imageType: {
        type: String, // Store the image type ('image/png')
        required: true
    }
});

const DiseaseImg=mongoose.model("DiseaseImg",DiseaseImgSchema);

module.exports =DiseaseImg;