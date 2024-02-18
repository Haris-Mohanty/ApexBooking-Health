import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUser, getAllDoctor } from "../controllers/adminController.js";

//Router Obj
const router = express.Router();

//Get all user
router.get("/getAllUser", authMiddleware, getAllUser);

//Get all Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctor);

//Export
export default router;
