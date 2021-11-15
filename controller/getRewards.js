const rewardsModal = require("../modal/rewardsmodal");

const getRewards = async (req, res) => {
    try {
        const rewards = await rewardsModal.find({});
        res.status(200).send(rewards);
      } catch (error) {
        res.status(401).send(error);
      }
};

module.exports=getRewards;