const mongoose=require('mongoose')

const blacklistTokenSchema=new mongoose.Schema({
   token:{
    type:String,
    required:[true,"Token added to Blacklist"]
   }
})

const tokenBlacklistModel=mongoose.model("blacklisttokens",blacklistTokenSchema)

module.exports=tokenBlacklistModel