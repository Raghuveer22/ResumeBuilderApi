const express = require('express');
const apiRouter = require('../routers/resume');

const cors = require('cors');
const app = express();
// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);
module.exports=app;
