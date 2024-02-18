import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUser } from "../controllers/adminController.js";

//Router Obj
const router = express.Router();

//Get user
router.get("/getAllUser", authMiddleware, getAllUser);

//Export
export default router;
