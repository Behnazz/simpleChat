const express = require('express');
const app = express();
const router = require('./routes.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('./models/Message');
app.use(cors());
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api', router);

app.listen(4000, () => {
  console.log('app is listening');
});
