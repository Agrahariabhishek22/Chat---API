const express=require('express');

// import router
const router=express.Router();

// import controllers
const { sendMessage,getMessage } = require('../controllers/messageController');
const isAuthenticated = require('../middlewares/isAuthenticated');


// routes
router.post('/send/:id',isAuthenticated,sendMessage)
router.get('/recieve/:id',isAuthenticated,getMessage)

module.exports=router;