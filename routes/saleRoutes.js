import express from "express";
import {
  getAllSales,
  createSale,
  getSaleById,
  deleteSale,
} from "../controllers/saleController.js";

const router = express.Router();

router.get("/", getAllSales);
router.get("/:id", getSaleById);
router.post("/", createSale);
router.delete("/:id", deleteSale);

export default router;
