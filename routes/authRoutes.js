import express from "express";
import { registerUser, loginUser , getAllUsers,
  getUserById,
  createUser, } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

