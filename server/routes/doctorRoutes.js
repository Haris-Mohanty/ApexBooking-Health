import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getDoctorInfo } from "../controllers/doctorController.js";

//Router obj
const router = express.Router();

//Get doctor info by doctor ID
router.post("/get-doctor-info", authMiddleware, getDoctorInfo);

//Export
export default router;
