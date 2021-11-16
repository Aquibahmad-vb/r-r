const express = require("express");

const Router = express.Router();

// requiring routes function from users controller
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