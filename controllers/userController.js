
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.register=async(req,res)=>{
      try {
            const{fullname,username,password,profilePhoto,confirmPassword,gender}=req.body;
            if(!fullname||!username||!password||!confirmPassword||!gender){
                  return res.status(400).json({
                        success:false,
                        message:"All fields are required"
                  })
            }
            if(password!==confirmPassword){
                  return res.status(400).json({
                        success:false,
                        message:"Password did not match"
                  })
            }
            const user=await User.findOne({username});
            if(user){
                  return res.status(400).json({
                        success:false,
                        message:"User is already registered"
                  })
            }
            // hashing password
            const hashedPassword=await bcrypt.hash(password,10);
            // profilephotos
            const maleProfilePhoto=`https://avatar.iran.liara.run/public/boy?username=${fullname}`;
            const femaleProfilePhoto=`https://avatar.iran.liara.run/public/girl?username=${username}`;

            await User.create({
                  fullname,
                  username,
                  password:hashedPassword,
                  profilePhoto:gender==="male"? maleProfilePhoto:femaleProfilePhoto,
                  gender
            })
            return res.status(200).json({
                  Success:true,
                  message:"User registered successfully"
            })
      } catch (error) {
            console.log(error);
      }
}

// login
exports.login=async(req,res)=>{
      try {
            const {username,password}=req.body;
            if(!username||!password){
                  return res.status(400).json({
                        success:false,
                        message:"All fields are required"
                  })
            }
            const user=await User.findOne({username});
            if(!user){
                  return res.status(400).json({
                        Success:false,
                        message:"Kindly register first"
                  })
            }
            const isPasswordMatch=await bcrypt.compare(password,user.password);
            if(!isPasswordMatch){
                  return res.status(400).json({
                        message:"Incorrect password",
                        Success:false
                  })
            }
            const tokenData={
                  userId:user._id
            }

            const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});

            return res.status(200).cookie('token',token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
                  _id:user._id,
                  username:user.username,
                  fullname:user.fullname,
                  profilePhoto:user.profilePhoto
            });

      } catch (error) {
            console.log(error);
            console.log("Login me dikkat a raha");     
      }
}

exports.logout=async(req,res)=>{
      try {
            return res.status(200).cookie('token',"",{maxAge:0}).json({
                  message:"Successfully loggedOut"
            })
      } catch (error) {
            console.log(error);
            console.log("Log out krne me dikkat a rhi");
      }
}

exports.getOtherUsers=async(req,res)=>{
      try {
            const loggedInUserId=req.id;
            const otherUsers=await User.find({
                  _id:{$ne:loggedInUserId}
            }).select("-password");
            
            return res.status(200).json({otherUsers});
      } catch (error) {
            console.log(error);
      }
}

