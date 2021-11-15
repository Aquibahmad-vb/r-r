const getRewards = async (req, res) => {
    try {
        const rewards = await rewardModal.find({});
        res.status(200).send(rewards);
      } catch (error) {
        res.status(401).send(error);
      }
};

module.exports=getRewards;