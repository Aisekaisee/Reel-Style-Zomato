const foodPartnerModel = require('../models/foodPartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req,res,next) {
    
    const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        // creating a new property in request object
        req.foodPartner = foodPartner;

        next();

    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }

}

async function authUserMiddleware(req,res,next) {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await userModel.findById(decoded.id);

      // creating a new property in request object
      req.user = user;

      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
}