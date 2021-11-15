const rewardModal = require("../modal/rewardsmodal");
const storeReward = async (req, res) => {
    try {
        const rewardDetails = await new rewardModal(req.body);
        rewardDetails.save((err,rewardDetails)=> {
          if(err)
          res.status(401).send(err);
          res.status(201).send(rewardDetails);
        });
    
       // res.status(201).send(rewardDetails);
      } catch (error) {
        res.send(error);
      }
};

module.exports = storeReward;