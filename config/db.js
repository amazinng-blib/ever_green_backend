const mongoose = require('mongoose');
require('dotenv').config();

// const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(
      process.env.MONGO_URI ||
        'mongodb+srv://nwankwoernest2020:bBHUJ4eBWVq06S2N@cluster0.suwrnl1.mongodb.net/Evergreenfx'
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// mongodb://0.0.0.0:27017/evergreenfx
// mongodb+srv://nwankwoernest2020:bBHUJ4eBWVq06S2N@cluster0.suwrnl1.mongodb.net/Evergreenfx
