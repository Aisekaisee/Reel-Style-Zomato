const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: "Video file is required (form-data key: video)",
      });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
    );

    if (!fileUploadResult?.url) {
      throw new Error("Upload completed but URL was not returned by ImageKit");
    }

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id
    });

    return res.status(201).json({
      message: "food created successfully",
      videoUrl: fileUploadResult.url,
      food: foodItem
    });
  } catch (err) {
    console.error("createFood upload error:", err);

    return res.status(500).json({
      message: "Failed to upload video",
      error: err.message,
    });
  }
}

async function getFoodItems(req,res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message:"Food items fetched successfully",
        foodItems
    })
}

async function likeFood(req,res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: req.user._id,
    food: foodId
  });

  // Unlike the food item if it's already liked by the user
  if(isAlreadyLiked){
    await likeModel.deleteOne({
      user: user._id,
      food: foodId  
    });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likesCount: -1 } });
    return res.status(200).json({ message: "Food item unliked successfully" });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId
  });
  await foodModel.findByIdAndUpdate(foodId, { $inc: { likesCount: 1 } });
  res.status(200).json({ message: "Food item liked successfully",like });
}

async function saveFood(req,res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: req.user._id,
    food: foodId,
  });

  // Unsave the food item if it's already saved by the user
  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });
    return res.status(200).json({ message: "Food item unsaved successfully" });
  }

  const saved = await saveModel.create({
    user: user._id,
    food: foodId,
  });
  res.status(200).json({ message: "Food item saved successfully", saved });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood
};
