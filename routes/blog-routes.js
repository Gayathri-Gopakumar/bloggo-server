// const express=require('express')
// const blogController=require('../controllers/blogController')

// const blogrouter=new express.Router()

// blogrouter.get('/',blogController.getAllBlogs)
// blogrouter.post('/add',blogController.addBlog)
// blogrouter.put('/update/:id',blogController.updateBlog)
// blogrouter.get('/:id',blogController.getById)
// blogrouter.delete('/:id',blogController.deleteBlog)
// blogrouter.get('/user/:id',blogController.getByUserId)

// module.exports=blogrouter
// routes/blogRoutes.js
const express = require('express');
const blogController = require('../controllers/blogController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = new express.Router();

router.get('/', blogController.getAllBlogs);
router.post('/add',  blogController.addBlog);
router.put('/update/:id', blogController.updateBlog);
router.get('/:id', blogController.getById);
router.delete('/:id',  blogController.deleteBlog); 
router.get('/user/:id', blogController.getByUserId);

module.exports = router;
