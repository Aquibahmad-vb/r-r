const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router();
const auth=require("../middleware/auth")

// requiring routes function from rewards controller
const {
  storeReward,
  getRewards,
  getRewardDetail,
  editReward,
  deleteReward,
  launchRewards,
  storeSignup,
  userLogin,
  searchRewards
} = require('../controller/rewardscontroller');

// end points for Rewards crud operation
Router.post("/rewards",auth,getRewards);
Router.post("/rewards/create",auth, storeReward);
Router.get("/rewards/:id",auth, getRewardDetail);
Router.put("/rewards/:id/edit" ,auth, editReward);
Router.delete("/rewards/:id",auth, deleteReward);
Router.put("/rewards/:id/launch",auth, launchRewards);
Router.post("/signup",storeSignup),
Router.post("/login",userLogin);
Router.post("/search",searchRewards);


// exporting end points
module.exports = Router;