import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getDoctorInfo,
  updateDoctorProfile,
  getDoctorById,
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../controllers/doctorController.js";

//Router obj
const router = express.Router();

//Get doctor info by doctor ID
router.post("/get-doctor-info", authMiddleware, getDoctorInfo);

//Update doctor pofile
router.post("/update-profile", authMiddleware, updateDoctorProfile);

//Get Doctor By Id
router.post("/getDoctorById", authMiddleware, getDoctorById);

//Get Appointments of Doctor
router.get("/doctor-appointments", authMiddleware, getDoctorAppointments);

//Appointment status update
router.post(
  "/updateAppointmentStatus",
  authMiddleware,
  updateAppointmentStatus
);

//Export
export default router;
