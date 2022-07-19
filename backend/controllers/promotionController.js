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

//@desc Update a promotion
//@route PUT /api/promotions/:id
//@access Private/Admin
const updatePromotion = asyncHandler(async (req, res) => {
  const {
    name,
    discount,
    description,
    image,
    startDate,
    endDate,
    active,
    backgroundColor,
  } = req.body;

  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    promotion.name = name;
    promotion.discount = discount;
    promotion.description = description;
    promotion.image = image;
    promotion.startDate = startDate;
    promotion.endDate = endDate;
    promotion.active = active;
    promotion.backgroundColor = backgroundColor;

    const updatedPromotion = await promotion.save();
    res.status(201).json(updatedPromotion);
  } else {
    res.status(404);
    throw new Error("Promotion not found");
  }
});

//@desc Fetch Single Promotion
//@route GET /api/promotion/:id
//@access Public
const getPromotionById = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    res.json(promotion);
  } else {
    res.status(404);
    throw new Error("Promotion not found");
  }
});

//@desc Delete a promotion
//@route DELETE /api/promotion/:id
//@access Private/Admin
const deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    await promotion.remove();
    res.json({ message: "Promotion removed" });
  } else {
    res.status(404);
    throw new Error("Promotion not found");
  }
});

//@desc Get active promotions
//@route GET /api/promotions/active
//@access Public
const getActivePromotions = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findOne({ active: true });
  res.json(promotion);
});

export {
  getPromotions,
  createPromotion,
  getPromotionById,
  deletePromotion,
  updatePromotion,
  getActivePromotions,
};
