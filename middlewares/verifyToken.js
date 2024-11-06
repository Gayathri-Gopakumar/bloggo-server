// middleware/verifyToken.js
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ message: "Authorization token is missing" });
//         }

//         const token = authHeader.split(" ")[1]; // Get the token from the "Bearer <token>" format
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret

//         req.user = decoded; // Attach the decoded user info (e.g., user ID) to the request object
//         next(); // Continue to the next middleware or controller function
//     } catch (err) {
//         return res.status(403).json({ message: "Invalid or expired token" });
//     }
// };

// module.exports = verifyToken;
