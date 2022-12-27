// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8001;

const server = app.listen(port, () => (console.log(`running on localhost: ${port}`)))

// GET Route
app.get('/all', function(req, res) {
    res.send(projectData)
})

// POST Route
app.post('/entry', function(req, res) {
    const data = req.body;
    const newEntry = {
        temperature: data.temperature,
        date: data.date,
        userResponse: data.userResponse
    }
    projectData = newEntry;
    res.send(projectData);
})
