import express from "express";
import { register, login } from "../controllers/userController.js";

//router obj
const router = express.Router();

//***** Create routes ******/
//Register user
router.post("/register", register);

//Login user
router.post("/login", login);

//export
export default router;
