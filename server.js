// Import packages
const express = require('express');
const mongoose = require('mongoose');
const formData = require("express-form-data");
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const products = require('./routs/products.js');
const users = require('./routs/users.js');

//A package that allows express to read environment variables (like CONNECTION_STRING)
require('dotenv').config();

// Create a server object
const server = express();


// Connect to the database using mongoose
// Note: make sure to put your connection string!
const connectionString = process.env.CONNECTION_STRING;
const connectionConfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};

mongoose
    .connect(connectionString, connectionConfig)
    .then(
        () => {
            console.log('DB is connected')
        }
    )
    .catch(
        (error) => {
            console.log('error occured', error)
        }
    )

//Configure for cloudinary
cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
)

//Tell express to allow CORS (cross-origin resource sharing)    
server.use(cors());

    // Tell express how to use body-parser
server.use( bodyParser.urlencoded({ extended: false }) );

// Also tell express to recognize JSON
server.use( bodyParser.json() );

server.use(formData.parse());

// Create a Route
server.get(
    '/',                                // http://localhost:3001/
    (req, res) => {
        res.send("<h1>Welcome to Home Page</h1>");
    }
);

server.use(
    '/users', 
    users
)

server.use(
    '/products', 
    products
)



server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
  });