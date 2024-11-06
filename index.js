const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/user-routes');
const blogrouter=require('./routes/blog-routes')
// const adminrouter=require('./routes/admin-routes')
require('./dbConnection/connection');

const bloggoServer = express();

bloggoServer.use(cors());
bloggoServer.use(express.json());

// Mount the user router at '/api/users'
bloggoServer.use('/api/users', router);
bloggoServer.use('/api/blogs', blogrouter);
// bloggoServer.use('/api/admin', adminrouter);



// Serve static files in the 'uploads' directory
bloggoServer.use('/uploads', express.static('./uploads'));

const PORT = process.env.PORT || 3000;

bloggoServer.listen(PORT, () => {
    console.log(`pfServer has started at ${PORT} and is waiting for client request!`);
});

// Root routes for testing
bloggoServer.get('/', (req, res) => {
    res.status(200).send(`<h1 style="color:red">PFServer started and waiting for client request!</h1>`);
});

bloggoServer.post('/', (req, res) => {
    res.status(200).send(`<h1 style="color:red">PFServer received POST request!</h1>`);
});

bloggoServer.put('/', (req, res) => {
    res.status(200).send(`<h1 style="color:red">PFServer received PUT request!</h1>`);
});

bloggoServer.delete('/', (req, res) => {
    res.status(200).send(`<h1 style="color:red">PFServer received DELETE request!</h1>`);
});
