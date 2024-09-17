const mongoose = require('mongoose');

const aiImgSchema=new mongoose.Schema({
    image: {
        type: Buffer, // This stores the image as binary data
        required: true
    },
    imageType: {
        type: String, // Store the image type ('image/png')
        required: true
    }
});

const aiImg=mongoose.model("ImgQuestions",aiImgSchema);

module.exports =aiImg;