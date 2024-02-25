import express from "express";
import {
  register,
  login,
  getUserInfo,
  applyDoctor,
  markAllNotificationsAsSeen,
  deleteAllSeenNotifications,
  getAllDoctors,
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

//Get all doctors
router.get("/getAllDoctor", getAllDoctors);

//export
export default router;
