const express = require('express');
const viewRouter = express.Router();


viewRouter.get('/', (req, res) => {
  
  res.render('form');
});

module.exports = viewRouter;
