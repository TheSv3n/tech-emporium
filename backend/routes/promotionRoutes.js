import express from "express";
const router = express.Router();
import {
  createPromotion,
  deletePromotion,
  getPromotionById,
  getPromotions,
  updatePromotion,
} from "../controllers/promotionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, admin, getPromotions)
  .post(protect, admin, createPromotion);

router
  .route("/:id")
  .get(getPromotionById)
  .put(protect, admin, updatePromotion)
  .delete(protect, admin, deletePromotion);

export default router;
