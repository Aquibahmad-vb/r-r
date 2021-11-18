const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router();

const {
  storeSignup,
  userLogin,
  
} = require("../controller/user");
Router.post("/signup", storeSignup);
Router.post("/login", userLogin);



// requiring routes function from rewards controller
const {
  storeReward,
  getRewards,
  getRewardDetail,
  editReward,
  deleteReward,
  launchRewards
} = require('../controller/rewardscontroller');

// end points for Rewards crud operation
Router.get("/rewards", getRewards);
Router.post("/rewards/create", storeReward);
Router.get("/rewards/:id", getRewardDetail);
Router.put("/rewards/:id/edit", editReward);
Router.delete("/rewards/:id", deleteReward);
Router.put("/rewards/:id/launch",launchRewards);


// exporting end points
module.exports = Router;