const mongoose=require("mongoose")


async function connectToDB(){

    try{

    
    mongoose.connect(process.env.MONGO_URI)

    console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectToDB