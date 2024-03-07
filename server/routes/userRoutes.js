import express from "express";
import {
  register,
  login,
  getUserInfo,
  applyDoctor,
  markAllNotificationsAsSeen,
  deleteAllSeenNotifications,
  getAllApprovedDoctors,
  bookingAppointment,
  bookingAvailability,
  userAppointments,
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
router.post("/apply-doctor", authMiddleware, applyDoctor);

//Mark all notifications as seen
router.post("/mark-all-notifications-as-seen", markAllNotificationsAsSeen);

//Delete all seen notifications
router.post("/delete-all-seen-notifications", deleteAllSeenNotifications);

//Get all approved doctors
router.get("/getAllApprovedDoctors", getAllApprovedDoctors);

//Book Appointment
router.post("/book-appointment", authMiddleware, bookingAppointment);

//Booking availability
router.post("/booking-availability", authMiddleware, bookingAvailability);

//Get appointments
router.get("/user-appointments", authMiddleware, userAppointments);

//export
export default router;
