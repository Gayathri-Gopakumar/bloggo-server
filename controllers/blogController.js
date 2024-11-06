const mongoose = require('mongoose');
const Blog = require('../model/blogModel');
const User = require('../model/userModel'); 
const blogs = require('../model/blogModel');


exports.getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
      blogs = await Blog.find().populate('user', 'name _id'); // Populate only name and _id
      console.log("Fetched blogs from DB:", blogs); // Log to verify data structure
    } catch (err) {
      console.log("Error fetching blogs:", err);
      return res.status(500).json({ message: 'Error fetching blogs' });
    }
  
    if (!blogs) {
      return res.status(404).json({ message: 'No blogs found' });
    }
  
    return res.status(200).json({ blogs });
  };


exports.addBlog=async(req,res,next)=>{
    const{title,description,image,user}=req.body

    let existingUser;
    try{
        existingUser=await User.findById(user)
    }catch(err){
        return console.log(err);
        
    }
    if(!existingUser){
        return res.status(404).json({message:'User with this id not found'})
    }

    const blog=new Blog({
        title,description,image,user
    })
    try{
      const session= await mongoose.startSession()
      session.startTransaction()
      await blog.save({session})
      existingUser.blogs.push(blog)
      await existingUser.save({session})
      await session.commitTransaction()

    }catch(err){
        return res.status(401).json(err)
        
    }
    return res.status(200).json({blog})
}


exports.updateBlog=async(req,res,next)=>{
    const {title,description}=req.body
    const blogId=req.params.id
    let blog;
    try{
        blog =await Blog.findByIdAndUpdate(blogId,{title,description})

    }catch(err){
        return console.log(err);
        
    }
    if(!blog){
        return res.status(404).json({message:"Unable to get blog"})
    }
    return res.status(200).json({blog})
}

exports.getById=async(req,res,next)=>{
    const id=req.params.id
    let blog;
    try{
        blog=await Blog.findById(id)
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"No Blog found"})
    }
    return res.status(200).json({blog})
}

exports.deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;

    try {
        // Attempt to find and delete the blog, and populate 'user'
        blog = await Blog.findByIdAndDelete(id).populate('user');

        // Check if the blog exists and has a user reference
        if (blog && blog.user) {
            await blog.user.blogs.pull(blog); // Remove the blog from user's blogs list
            await blog.user.save(); // Save the updated user document
        }
    } catch (err) {
        console.error("Error during deletion:", err); // Log the error for debugging
        return res.status(500).json({ message: "An error occurred while deleting the blog", error: err.message || err });
    }

    // If the blog wasn't found in the database
    if (!blog) {
        return res.status(404).json({ message: "No blog found" });
    }

    // Respond with a success message if deletion was successful
    return res.status(200).json({ message: "Blog deleted successfully" });
};

exports.getByUserId=async (req,res,next)=>{
    const userId=req.params.id
    let userBlogs;
    try{
        userBlogs=await User.findById(userId) .populate({
            path: 'blogs',
            populate: { path: 'user', select: 'name' } // Ensures the name is included in each blog
        })

    }catch(err){
        return console.log(err);
        
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blog found"})
    }
    return res.status(200).json({user:userBlogs})
}