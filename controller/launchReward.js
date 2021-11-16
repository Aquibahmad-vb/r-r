const rewardsModal = require("../modal/rewardsmodal");

const launchRewards = async(req,res)=>{
    try{
        const status="Launch"
        // update reward status to launch
        const rewards = await rewardsModal.findOneAndUpdate({_id:req.params.id},{$set:{status:status}});
        if(rewards===null){
            return res.status(404).send("id not found");
        }
        if(rewards.status==="Launch")
        {
            return res.status(200).send("rewards are already launch")
        }
        res.status(202).send(`rewards status updated from ${rewards.status} to launch \n`);
    }catch (error){
        // if id not in form of ObjectIid show response id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found");
        }
        console.log(error)
    }
};

module.exports=launchRewards;