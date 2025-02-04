const jwt=require('jsonwebtoken')
require('dotenv').config();

const isAuthenticated=async(req,res,next)=>{
      try {            
            const token=req.cookies.token;
             if(!token){
                  return res.status(401).json({
                        message:"User not authenticated",
                  })
            }
            const decode=jwt.verify(token,process.env.SECRET_KEY);
            if(!decode){
                  return res.status(401).json({
                        message:"invalid token",
                  })
            }
            // console.log(decode);
            req.id=decode.userId;            
            next();
      } catch (error) {
            console.log(error);
      }
}

module.exports=isAuthenticated;