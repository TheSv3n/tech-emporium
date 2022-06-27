import asyncHandler from "express-async-handler";
import Promotion from "../models/promotionModel.js";

//@desc Get all promotions
//@route GET /api/promotions
//@access Private/Admin
const getPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find({});
  res.json(promotions);
});

export { getPromotions };
