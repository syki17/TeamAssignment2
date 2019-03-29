/*
File Name: index.js
Author: Jakub Sykora Nicholas Gardner
Website: https://ticketsystem2106.herokuapp.com/
Description: controller for the index page
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

module.exports = router;
