const rewardsModal = require("../modal/rewardsmodal");

let responseObj = {
    "status": "",
    "msg": "",
    "body": {

    }
}

const searchRewards = (req, res, next) => {
    const rewardType = req.query.search; 
    try{
        const rewardType = req.query.search; 
        if(!req.query.search) {
            responseObj = {
                "status": "error",
                "msg": "Query param is missing.",
                "body": {}
            }
            res.status(500).send(responseObj);
        }else{
            //match
     
            rewardsModal.find({reward_type: {$regex:rewardType.trim(), $options: 'i'}}, (err, rewards) => {
                if(err) {
                    responseObj = {
                        "status": "error",
                        "body": {}
                    }
                    res.status(500).send(responseObj);
                }else{
                    responseObj = {
                        "status": "success",
                        "body": rewards
                    }
                    if(rewards.length<1){
                        res.status(401).send("No rewards found");
                    }
                    else
                    res.status(200).send(responseObj);
                }
            })
        }
    }catch(error) {
        console.log('Error::', error);
    }
}

module.exports=searchRewards;