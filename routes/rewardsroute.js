const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router();
const auth=require("../middleware/auth")

// const {
//   storeSignup,
//   userLogin,
  
// } = require("../controller/user");
// Router.post("/signup", storeSignup);
// Router.post("/login", userLogin);



// requiring routes function from rewards controller
const {
  storeReward,
  getRewards,
  getRewardDetail,
  editReward,
  deleteReward,
  launchRewards,
  storeSignup,
  userLogin
} = require('../controller/rewardscontroller');

// end points for Rewards crud operation
Router.get("/rewards",auth,getRewards);
Router.post("/rewards/create",auth, storeReward);
Router.get("/rewards/:id", auth, getRewardDetail);
Router.put("/rewards/:id/edit", auth , editReward);
Router.delete("/rewards/:id", auth , deleteReward);
Router.put("/rewards/:id/launch",auth, launchRewards);
Router.post("/signup",storeSignup),
Router.post("/login",userLogin);


// exporting end points
module.exports = Router;