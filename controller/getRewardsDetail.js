const rewardsModal = require("../modal/rewardsmodal");

const getRewardDetail = async (req, res) => {
    try{
        // find reward by id 
        const users = await rewardsModal.findOne({_id:req.params.id});

        // if id not match in db then send response id not found
        if(users===null)
        {
            return res.status(404).send("id not found");
        }

        // send response
        res.status(200).send(users);
    } catch (error){
        // if id not in form of ObjectIid show response id not found
        if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found");
        }
          console.log(error)
      }
};
module.exports=getRewardDetail