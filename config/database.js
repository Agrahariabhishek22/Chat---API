const mongoose=require('mongoose');

require('dotenv').config();

const connectDB=async()=>{
      await mongoose.connect(process.env.MONGODB_URL).then(()=>{
            console.log("DB Connected Successfully");
      }).catch((error)=>{
            console.log(error);
            console.log("bhai Db Connect nhi hui");
      })
}
module.exports=connectDB;