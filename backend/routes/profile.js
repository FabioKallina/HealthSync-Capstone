
/**
 * Profile Routes
 * Handles all profile-related endpoints
 * All routes are protected and require JWT authentication
 * Author: Fabio Kallina de Paula
 * Created: June 5, 2025
 */

import express from "express";

import { deleteUser, getProfile, updateProfile } from "../controllers/profileController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticateToken);

//GET Profile
router.get("/", getProfile);

//UPDATE Profile
router.put("/", updateProfile);

//DELETE user and profile
router.delete("/delete", deleteUser)

export default router;

