const express = require('express');
const apiRouter = require('../routers/resume');


const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);
module.exports=app;
