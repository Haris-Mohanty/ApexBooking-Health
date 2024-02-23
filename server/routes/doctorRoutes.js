import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getDoctorInfo,
  updateDoctorProfile,
} from "../controllers/doctorController.js";

//Router obj
const router = express.Router();

//Get doctor info by doctor ID
router.post("/get-doctor-info", authMiddleware, getDoctorInfo);

//Update doctor pofile
router.post("/update-profile", authMiddleware, updateDoctorProfile);

//Export
export default router;
