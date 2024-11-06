// const express = require('express');
// const User = require('../model/userModel');
// const Blog = require('../model/blogModel');
// const verifyToken = require('../middlewares/verifyToken');
// const verifyAdmin = require('../middlewares/verifyAdmin');

// const router = express.Router();

// // Get all users (admin only)
// router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get all blogs (admin only)
// router.get('/blogs', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const blogs = await Blog.find({}).populate('user', 'name');
//     res.status(200).json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;
