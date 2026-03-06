const foodModel = require("../models/food.model");
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

module.exports = {
  createFood,
};
