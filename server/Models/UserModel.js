import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required!"],
    },
    email: {
      type: String,
      unique: true,
      validate: validator.isEmail,
      required: [true, "Email is Required!"],
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
