import mongoose from "mongoose";
import { isEmail } from "validator";

const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    validate: [isEmail, "invalid email"],
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("all_users", UserSchema);
