// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')

const path = require('path');
const apiRouter = require('./routes/api');

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
//app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

// SEQUELIZE CONNECTION
// const sequelize = new Sequelize(process.env.PG_URI)

/* define route handlers */
app.use('/api', apiRouter);

// SEQUELIZE CONNECTION
// const sequelize = new Sequelize({
//     storage: process.env.PG_URI,
//     dialect: 'postgres',
//     username: 'postgres',
//     password: 'Love1221'
//   })
// try {
//     sequelize.authenticate()
//     console.log(`Connected with Sequelize at ${process.env.PG_URI}`)
// }catch(err) {
//     console.log(`Unable to connect to PG: ${err}`)
// }

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

/* global error handler */
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { error: 'An error occurred' }, // Corrected typo here as well
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.error(errorObj.log);
    console.error(err); // Log the original error for debugging purposes
    return res.status(errorObj.status).json(errorObj.message);
  });

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})