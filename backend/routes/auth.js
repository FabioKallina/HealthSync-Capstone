
/**
 * Authorization Routes
 * Handles all authorization-related endpoints
 * Author: Fabio Kallina de Paula
 * Created: June 5, 2025
 */

import express from "express";
import dotenv from "dotenv";
import { authLogin, createRegistration, forgotPassword, resetPassword } from "../controllers/authController.js";

dotenv.config();
const router = express.Router();

//REGISTER
router.post("/register", createRegistration);

//LOGIN
router.post("/login", authLogin);

//PASSWORD
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;