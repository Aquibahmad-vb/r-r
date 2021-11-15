const rewardsModal = require("../modal/rewardsmodal");

const deleteReward = async (req, res) => {
    try{
        // find and delete reward by id
        const users = await rewardsModal.findOneAndDelete({_id:req.params.id});

        // if id not match in db then send response id not found
        if(users===null){
            
            return res.status(404).send("id not found")
        }
        
        // send response reward deleted with id no
        res.status(200).send(`1 reward deleted with id ${req.params.id}`);

        } catch(error){
            // if id not in form of ObjectIid send response id not found
            if(error.kind==='ObjectId'){
            return res.status(404).send("Id not Found");
            } 
            console.log(error)
        }

};

module.exports=deleteReward;
