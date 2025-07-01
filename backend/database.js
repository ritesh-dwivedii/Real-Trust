const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://riteshs2902:2907@cluster0.9kjovur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
