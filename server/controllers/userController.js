import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }
    //Password validation
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character",
        success: false,
      });
    }

    //Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists!",
        success: false,
      });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Register user
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).json({
      user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};
