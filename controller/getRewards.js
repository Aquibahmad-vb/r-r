const rewardsModal = require("../modal/rewardsmodal");

const getRewards = async (req, res) => {
  const currentPage = req.query.currentPage;
  const pageSize = req.query.pageSize; 
  const skip = pageSize * (currentPage-1);
  // const limit = pageSize;
  let rewards
  try {
    if(!req.query.sort){
      rewards = await rewardsModal.find().skip(skip).limit(pageSize);
    }
    if(req.query.sort==='rewards_name'){
      rewards = await rewardsModal.find().skip(skip).sort({"reward_name":1}).limit(pageSize);
    }
    else if(req.query.sort==='date'){
      rewards = await rewardsModal.find().skip(skip).sort({"createdAt":1}).limit(pageSize);
    }
    else if(req.query.sort==='id'){
      rewards = await rewardsModal.find().skip(skip).sort({"_id":1}).limit(pageSize);
    }
    res.status(200).send(rewards);
    } catch (error) {
      res.status(401).send(error);
    }
};

module.exports=getRewards;