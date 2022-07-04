import asyncHandler from "express-async-handler";
import Promotion from "../models/promotionModel.js";

//@desc Get all promotions
//@route GET /api/promotions
//@access Private/Admin
const getPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find({}).populate("user", "id name");
  res.json(promotions);
});

//@desc Create a promotion
//@route POST /api/promotions
//@access Private/Admin
const createPromotion = asyncHandler(async (req, res) => {
  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const promotion = new Promotion({
    name: "Sample name",
    user: req.user._id,
    image: "/images/samplePromo.jpg",
    description: "Sample description",
    discount: 0,
    startDate: date,
    endDate: date,
    active: false,
    backgroundColor: "cardinal",
  });

  const createdPromotion = await promotion.save();
  res.status(201).json(createdPromotion);
});

export { getPromotions, createPromotion };
