import mongoose from "mongoose";
require("dotenv").config();

/**
 * connecting the db using mongo key (from .env file) and mongoose
 */

const db = process.env.MONGODB_KEY ? process.env.MONGODB_KEY : "";

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    return mongoose;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }

    // exit process if cannot connect!
    process.exit(1);
  }
};

export default connectDB;
