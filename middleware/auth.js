const userModal=require("../modal/usermodal")
const jwt=require("jsonwebtoken")

// verifying token is valid or not
const authToken=async(req,res,next)=>{
    const token=req.header('auth');
    // console.log(token)
    if(!token){
        return res.status(401).json({msg:"No token found, Authoriztion required"});
    };
    try {
        const user=await userModal.findOne({token})
        if(!user){
            return res.status(400).send({msg:"not valid user"})
        }
        if(user.role!="admin"){
            return res.status(401).send("not authorized user")
        }
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        req.user=decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"token is not valid"});
    }

}

module.exports=authToken