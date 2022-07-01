import express from "express";
const router = express.Router();
import {
  createPromotion,
  getPromotions,
} from "../controllers/promotionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, admin, getPromotions)
  .post(protect, admin, createPromotion);

export default router;
