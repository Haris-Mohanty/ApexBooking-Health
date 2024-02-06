import express from "express";
import { register, login, getUserInfo } from "../controllers/userController.js";

//router obj
const router = express.Router();

//***** Create routes ******/
//Register user
router.post("/register", register);

//Login user
router.post("/login", login);

//Get user info (for protected routes)
router.post("/get-user-info", getUserInfo);

//export
export default router;
