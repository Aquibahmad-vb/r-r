const rewardsModal = require("../modal/rewardsmodal");

const getRewards = async (req, res) => {
  const currentPage = req.body.currentPage;
  const pageSize = req.body.pageSize; 

const skip = pageSize * (currentPage-1);
const limit = pageSize;
    try {
        const rewards = await rewardsModal.find({}).skip(skip).limit(limit);
        res.status(200).send(rewards);
      } catch (error) {
        res.status(401).send(error);
      }
};

module.exports=getRewards;