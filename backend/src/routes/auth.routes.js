import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

// POST /api/auth/register
router.post(
  "/register",
  body("userName").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  registerUser
);

// POST /api/auth/login
router.post(
  "/login",
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
  loginUser
);

// GET /api/auth/profile
router.get("/profile", authRequired, getProfile);

export default router;
