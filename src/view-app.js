const express = require('express');
const viewRouter = require('../routers/views');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// View router

app.set('view engine', 'ejs');
app.set('views', path.join('views'));

// View router
app.use('/', viewRouter);


module.exports=app;