const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"Username already exists"]
    },
    email:{
        type:String,
        unique:[true,"Account already exists with this email address"],
        required:true,
    },
    password:{
        type:String,
        reuired:true
    }
})

const usermodel=mongoose.model("users",userSchema)

module.exports=usermodel