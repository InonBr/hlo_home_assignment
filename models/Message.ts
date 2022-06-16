import mongoose from "mongoose";
import { isEmail } from "validator";

const MessageSchema = new mongoose.Schema({
  sender: {
    required: true,
    validate: [isEmail, "invalid email"],
    type: String,
  },
  receiver: {
    required: true,
    validate: [isEmail, "invalid email"],
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
  subject: {
    required: true,
    type: String,
  },
  read: {
    required: true,
    type: Boolean,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("messages", MessageSchema);
