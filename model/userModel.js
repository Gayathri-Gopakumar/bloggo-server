const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false // Default to false; manually set to true for admins
    // },
    blogs:[{type: mongoose.Types.ObjectId,ref:"blogs",required:true}]
})

const users=mongoose.model("users",userSchema)

module.exports=users