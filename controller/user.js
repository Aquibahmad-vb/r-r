const signupUser = require("../modal/usermodal");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { use } = require("chai");

const storeSignup = async (req, res, next) => {
    signupUser.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail already Exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new signupUser({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            role:req.body.role
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'user created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                })


            }
        })
}
const userLogin = async (req, res, next) => {
    signupUser.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'login failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'login failed'
                    });
                }
                if (result) {
                    const payload={
                        user:{
                            email:user[0].email,
                            userId:user[0]._id
                        }
                    }
                  const token = jwt.sign(payload, process.env.JWT_KEY,
                    {
                        expiresIn:"2d"
                    }
                    )
                    signupUser.findOneAndUpdate({ email: req.body.email },{$set:{token}})
                    .exec()
                    .then((user)=>{
                        user.save()
                        })
                        .catch(err=>{
                            console.log(err.message)
                        })
                    return res.status(201).json({
                        message: 'login successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'login failed'
                   
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

module.exports = {
    storeSignup,
    userLogin
};