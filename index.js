const express=require('express');
const app=express();
const http=require('http');
const{server,io}=require('./socket/socket');// import the server and io from socket.js

// parser
app.use(express.json());

require('dotenv').config();
const connectDB=require('./config/database');
connectDB();

const PORT=process.env.PORT||4000;

// import cookie parser
const cookieParser=require('cookie-parser');
app.use(cookieParser());

// creating instance of cors
const cors=require('cors');

const corsOption={
      origin:'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials:true
};
app.use(cors(corsOption));

// importing routes
const userRoute=require('./routes/userRoutes');
app.use('/api/v1',userRoute);


const messageRoute=require('./routes/messageRoutes');
app.use('/api/v1',messageRoute);


server.listen(PORT,()=>{
      console.log(`App is listening at PORT ${PORT}`);
})
