import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
