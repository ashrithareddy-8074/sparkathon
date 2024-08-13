const express = require('express');
const mongoose = require('mongoose');

const app = express();

const ExpressError = require('./utils/ExpressError');

const DB_URL = 'mongodb+srv://annadiashrithaan:1YurPf9lQplX6Bkt@cluster0.twl2c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL)
  .then(async () => {
    console.log("Connected to Database")
  }
).catch(err => console.log(process.env.DB_CONNECT, "Connection Failed", err));

app.use('/', (req, res) => {
    res.send('hello');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
});

app.use((err, req, res, next) => {
    const {statusCode=500,  message='something not found'} = err;
    if(!err.message) err.message = 'Oh No, Something went wrong!!'
    res.status(statusCode).send('something went wrong');
});

app.listen('3000', (req, res) => {
    console.log('listening on port 3000');
});

