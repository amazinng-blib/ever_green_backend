const mongoose = require('mongoose');
require('dotenv').config();

// const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// mongodb://0.0.0.0:27017/videoapp
