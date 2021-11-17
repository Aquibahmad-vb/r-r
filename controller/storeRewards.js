const rewardsModal = require("../modal/rewardsmodal");

const storeReward = async (req, res) => {
    try {
        const rewardDetails = await new rewardsModal(req.body);
        rewardDetails.save((err,rewardDetails)=> {
          if(err)
          res.status(401).send('Required field is missing');
          res.status(201).send(rewardDetails);
        });
      } catch (error) {
        res.send(error);
      }
};

module.exports = storeReward;