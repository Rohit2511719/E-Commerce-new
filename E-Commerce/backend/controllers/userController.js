const User = require('../models/usermodels');
const jwt=require('jsonwebtoken');

const signupUser = async(req, res)=>{
    try{
        const{name, email, password} = req.body;
        // create a new user
        const user = new User({name, email, password});
        await user.save();
        res.status(201).json({message:"User Signed Up Successfully!!!", user:user});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server errorr"});
    }
};
// Login Api
const loginUser = async (req, res)=>{
    try{
        const {email,password}=req.body;
        // check if the user exist
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not Found"});
        }
        if(user.password !== password){
            return res.status(404).json({message:"Invalid Crendtial"});
        }

    // Generate Token
    const token = jwt.sign(
        {userId:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    
    
        res.status(200).json({message:"Login Successfull",User: user,token});
    }catch(error){
        console.error("error during login", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};
module.exports={signupUser, loginUser};