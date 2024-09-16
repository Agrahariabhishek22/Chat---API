const express=require('express');

// import router
const router=express.Router();

// import controller
const{register,login,logout,getOtherUsers}=require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');

 
// 
router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/',isAuthenticated,getOtherUsers);

module.exports=router;