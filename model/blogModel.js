const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        requireq:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    }
})

const blogs=mongoose.model("blogs",blogSchema)
module.exports=blogs