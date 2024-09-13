const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const signUp = require("./models/signup");
const DiseaseImg = require("./models/diseaseIMG");
const DiseaseText = require("./models/diseaseTEXT");
const profile=require("./models/profile");
const crop_history=require("./models/cropHistory");
const livestock_history=require("./models/livestockHistory");
const db_uri = process.env.DB_URI;
const port = process.env.PORT;

mongoose.connect(db_uri).then(console.log("Mongodb Connection Successful"));

app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: "*",
    credentials: true,
  })
);

app.post("/signup", async (req, res) => {
  const { aadhar, password, confirmPassword } = req.body;
  try {
    const user = await signUp.findOne({ aadhar });
    if (user) {
      return res.status(401).json({ error: "User Already exists!!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords are not matching" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);
    const sign = new signUp({
      aadhar,
      password: hashedpassword,
    });
    await sign.save();
    res.status(201).json({ message: "User registered Successfully!!" });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { aadhar, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords are not matching" });
    }
    const user = await signUp.findOne({ aadhar });
    if (!user) {
      res.status(401).json({ error: "User not Found." });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ error: "Invalid Credentials!!" });
    } else {
      res.status(200).json({ message: "User logged in Successfully!!" });
    }
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/crop-disease-img", upload.single("image"), async (req, res) => {
  try {
    const { diseaseName } = req.body;
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).send({ message: "Please upload an image" });
    }
    const disease = new DiseaseImg({
      diseaseName,
      image: imageFile.buffer,
      imageType: imageFile.mimetype,
    });
    await disease.save();
    return res
      .status(201)
      .json({ message: "Disease with image uploaded successfully!" });
  } catch {
    return res
      .status(500)
      .json({ error: "Failed to upload disease information" });
  }
});

app.post("/crop-disease-text", async (req, res) => {
  try {
    const { diseaseName, symptoms } = req.body;
    const disease = new DiseaseText({
      diseaseName,
      symptoms,
    });
    await disease.save();
  } catch {
    return res
      .status(500)
      .json({ error: "Failed to upload disease information" });
  }
});

app.post("/livestock-disease-img", upload.single("image"), async (req, res) => {
  try {
    const { diseaseName } = req.body;
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).send({ message: "Please upload an image" });
    }
    const disease = new DiseaseImg({
      diseaseName,
      image: imageFile.buffer,
      imageType: imageFile.mimetype,
    });
    await disease.save();
    return res
      .status(201)
      .json({ message: "Disease with image uploaded successfully!" });
  } catch {
    return res
      .status(500)
      .json({ error: "Failed to upload disease information" });
  }
});

app.post("/livestock-disease-text", async (req, res) => {
  try {
    const { diseaseName, symptoms } = req.body;
    const disease = new DiseaseText({
      diseaseName,
      symptoms,
    });
    await disease.save();
  } catch {
    return res
      .status(500)
      .json({ error: "Failed to upload disease information" });
  }
});

app.post("/create-profile", async (req, res) => {
  try {
    const { aadhar, name, age, address, land_owned, crops, livestock } =
      req.body;
    const user = await signUp.findOne({ aadhar });
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }
    const persona = new profile({
      aadhar,
      name,
      age,
      address,
      land_owned,
      crops,
      livestock,
    });
    await persona.save();
    return res.status(201).json({ message: "Profile Created Successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to create profile" });
  }
});

app.put("/profile", async (req, res) => {
  try {
    const { aadhar, name, age, address, land_owned, crops, livestock } =
      req.body;

    const user = await signUp.findOne({ aadhar });
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    const updatedProfile = await profile.findOneAndUpdate(
      { aadhar }, // Search Condition
      { $set: { name, age, address, land_owned, crops, livestock } }, // Update fields without touching unmentioned fields
      { new: true, runValidators: true } // return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found!" });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully!", updatedProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update profile information" });
  }
});

app.post("crop-history",async(req,res)=>{
    try{
        const {name,aadhar,history,date}=req.body;
        const user = await signUp.findOne({ aadhar });
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }
    const his=new crop_history({
        name,
        aadhar,
        history,
        date
    });
    await his.save();
    return res.status(200).json({ message: "Crop history added successfully!" });
    }
    catch{
        return res.status(500).json({message:"Error saving History of crops"})
    }
})

app.post("livestock-history",async(req,res)=>{
    try{
        const {name,aadhar,history,date}=req.body;
        const user = await signUp.findOne({ aadhar });
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }
    const his=new livestock_history({
        name,
        aadhar,
        history,
        date
    });
    await his.save();
    return res.status(200).json({ message: "Livestock history added successfully!" });
    }
    catch{
        return res.status(500).json({message:"Error saving History of livestock"})
    }
})

app.listen(port, () => {
  console.log("Server Started");
});
