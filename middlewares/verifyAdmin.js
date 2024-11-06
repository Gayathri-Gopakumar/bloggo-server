// // middleware/verifyAdmin.js
// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel');

// const verifyAdmin = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         if (!token) return res.status(403).json({ message: "Access Denied" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);

//         if (!user || !user.isAdmin) {
//             return res.status(403).json({ message: "Admin access required" });
//         }

//         req.user = user;
//         next();
//     } catch (err) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// module.exports = verifyAdmin;
