const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const {user} = require('../models/registerModel')
//LOGIN
require('dotenv').config();

let loginControllers = async (req,res) =>{
    try{
   //////////////////////////////////////////////////////////     
    //1.Recive the username, email and password
     console.log(req.body)
    
     const {email, password} = req.body //Destructuring
     console.log(email)     
     console.log(password)

  ///////////////////////////////////////////////////////////
     //2.Check if the username/email is availble or not 
    //adventure.findOne({}),function(err,)
    const userEx = await user.findOne({email});     

    if(!userEx){
        //3.1 if availble say "User exists we can give the token"

        //3.1 lets access the existing hash 
          return res.status(401).json({
            error:"Invalid credential"
    }); }
    
    //         res.status(200).json({
    //         msg:"user exists"
    // });

    const isMatch = await bcrypt.compare(password, userEx.password_hash);
    if(!isMatch){
          return res.status(401).json({
            Error:"invalid credintial broo!!!!"
        })
    }
    //obj.keyname
  
     const token = jwt.sign( { email: userEx.email}, process.env.JWT_TOKEN)
       //   return res.status(200).json({
        //     msg:"Login successful",
        //     data:userEx,
        //     token : jwt.sign( { email: userEx.email}, process.env.JWT_TOKEN)
        // });
    console.log(token);
     
////////////Save user in session
        req.session.user = {
        fullname: userEx.fullname,
        email: userEx.email
    };

     res.cookie("token",token,{httpOnly:true});
     res.redirect("/");
    

}

catch(error){
   return res.status(500).json({
    error:"server error"
});
}
};

module.exports = {loginControllers}