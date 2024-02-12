import express from "express";
import {
  register,
  login,
  getUserInfo,
  applyDoctor,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//router obj
const router = express.Router();

//***** Create routes ******/
//Register user
router.post("/register", register);

//Login user
router.post("/login", login);

//Get user info (for protected routes)
router.post("/get-user-info", authMiddleware, getUserInfo);

//Apply Doctor (Doctor is now a user so the routes added in user routes)
router.post("/apply-doctor", applyDoctor);

//export
export default router;
