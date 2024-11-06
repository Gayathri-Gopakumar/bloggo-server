const express=require('express')
const userController=require('../controllers/userController')
const verifyAdmin = require('../middlewares/verifyAdmin');

const router=new express.Router()

router.get('/',userController.getAllUsers)
router.post('/signup',userController.signUp)
router.post('/login',userController.login)
// router.delete('/:id', verifyAdmin, userController.deleteUser); // Admin can delete any user

module.exports=router