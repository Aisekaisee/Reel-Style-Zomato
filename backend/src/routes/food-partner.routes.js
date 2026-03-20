const express = require("express");
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

/* GET /api/food-partner/:id [protected route]*/
router.get(
  "/:id",
  authMiddleware.authFoodPartnerMiddleware,
  foodPartnerController.getFoodPartnerById,
);

module.exports = router;