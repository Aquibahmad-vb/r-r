const rewardsModal = require("../modal/rewardsmodal");

const editReward = async (req, res) => {
    try{ 
        const rewards = await rewardsModal.updateOne({_id:req.params.id},{$set:req.body});
        // if id not match in db then send response id not found
        if(rewards.modifiedCount===0)
        {
            return res.status(404).send("Id not Found");
        }
        res.status(202).send(`1 rewards updated \n`);
    }catch (error){
        // if id not in form of ObjectIid show response id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found");
    }
      console.log(error)
    }
};
module.exports=editReward;