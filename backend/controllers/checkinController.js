
/**
 * Description: This file handles checkIn controllers
 * Author: Fabio Kallina de Paula
 * Created: June 5, 2025
 */


import CheckIn from "../models/checkinModel.js";

const today = new Date().toISOString().split("T")[0];

/**
 * Get all checkIn data for the logged-in user
 * @route GET /api/checkin
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllCheckIn = async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ status: "error", message: "User not authenticated" });
    }

    const filter = {
      userId,
    };

    if (date) {
      filter.date = date;
    }
    const checkIn = await CheckIn.find(filter);
    res.status(200).json({ status: "success", data: checkIn });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve CheckIn Data",
      error: error.message,
    });
  }
};

/**
 * Create checkIn data for the logged-in user
 * @route POST /api/checkin
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createCheckIn = async (req, res) => {
  try {
    const { date, mood, journal } = req.body;

    const requiredFields = [mood, journal];
    const hasUndefined = requiredFields.some((field) => field === undefined);
    const existing = await CheckIn.findOne({ userId: req.user.id, date });

    if (hasUndefined) {
      return res.status(400).json({
        status: "error",
        message: "All fields required",
      });
    }

    if (existing) {
      existing.mood = mood;
      existing.journal = journal;
      const updated = await existing.save();
      return res.status(200).json({ status: "updated", data: updated });
    }

    const newCheckIn = new CheckIn({
      mood,
      journal,
      date: date || today,
      userId: req.user.id,
    });

    const savedCheckIn = await newCheckIn.save();

    res.status(201).json({ status: "success", data: savedCheckIn });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to submit CheckIn",
      error: error.message,
    });
  }
};
