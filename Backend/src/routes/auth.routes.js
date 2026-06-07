const express=require('express')
const authController=require("../controllers/auth.controller")
const authMiddleware=require("../middleware/auth.middleware")
const authRouter=express.Router()

//register a new user
authRouter.post("/register",authController.registerUserController)

//route-post /api/auth/login
//login user with eamil and password
authRouter.post("/login",authController.loginUserController)

//route-get /api/auth/logout
//logout user by blacklisting the token
authRouter.get("/logout",authController.logoutUserController)

//route-get/api/auth/get-me
//get the current logged in user details(before this there will be a middleware to identify which uswr has asked for response)
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports=authRouter