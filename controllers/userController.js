const User = require('../model/userModel'); 
const bcrypt=require('bcryptjs')

exports.getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find(); // Use the model name directly here
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while fetching users" });
    }
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
};

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email }); // Await the database query
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while checking for an existing user" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "USER ALREADY EXISTS! PLEASE LOGIN" });
    }

    const hashedPassword=bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    });
    

    try {
        await user.save(); // Await the save operation
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while saving the user" });
    }

    return res.status(201).json({ user }); // Send back the new user
};


exports.login=async(req,res,next)=>{
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email }); // Await the database query
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while checking for an existing user" });
    }

    if (!existingUser) {
        return res.status(400).json({ message: "USER DONT EXIST! PLEASE SIGNUP" });
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect password"})
        alert("PASSWORD INCORRECT")
    }
    return res.status(200).json({message:"Login Successfull",user:existingUser})

}

// exports.deleteUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "Error deleting user" });
//     }
// };