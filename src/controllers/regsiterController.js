const {user} = require('../models/registerModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


let registerControllers = async(req,res) =>{
try{
    const existingUser = await user.findOne({email: req.body.email})
    if(existingUser){
        return res.status(200).json({
            msg:"user alredy registred"
        });
    }
    console.log(req.body.password_hash)
    const saltRound = 10 ;
    let encryptedpassword = bcrypt.hashSync(req.body.password_hash, saltRound);
    req.body.password_hash = encryptedpassword
    console.log(req.body.password_hash)
    //MongoDB
    const User = new user(req.body)
    await User.save();

    //generate token
    var token = jwt.sign(req.body , process.env.JWT_TOKEN);
    // return res.status(200).json({
    //     msg:"Data Store in Database",
    //     data:User,
    //     token:token
    // });

    res.redirect("/login")
}
    catch(error){
       return res.status(500).json({
            msg:"Error occured"
        })
    }
}
module.exports = {registerControllers}