const rewardsModal = require("../modal/rewardsmodal");
const storeReward=require("./storeRewards");
const getRewards=require("./getRewards");
const getRewardDetail=require("./getRewardsDetail");
const editReward=require("./editReward");
const deleteReward=require("./deleteRewards");
const launchRewards=require("./launchReward");
const {storeSignup,userLogin}=require("./user");
const searchRewards=require("./searchReward");
    


module.exports = {
    storeReward,
    getRewards,
    getRewardDetail,
    editReward,
    deleteReward,
    launchRewards,
    storeSignup,
    userLogin,
    searchRewards
};