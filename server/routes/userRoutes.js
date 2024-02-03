import express from "express";
import { register } from "../controllers/userController.js";

//router obj
const router = express.Router();

//***** Create routes ******/
//Register
router.post("/register", register);

//export
export default router;
