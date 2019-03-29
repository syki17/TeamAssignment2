/*
File Name: index.js
Author: Jakub Sykora Nicholas Gardner
Website: https://ticketsystem2106.herokuapp.com/
Description: controller for the index page
*/

var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ticketing System',
  text: 'Comp 2106 Assignment 2 - Ticketing System by: Nic and Jakub'});
});

/**
 * show the registration page
 */
router.get('/register', function(req,res,next){
  res.render('register');
});

/**
 * Create account and store in DB
 */
router.post('/register', function(req,res,next){
    console.log(req.body.role);
  Account.register(
      new Account({
          username: req.body.username,
          email: req.body.email,
          role: req.body.role,

      }),
        req.body.password,
      function(err, account) {
          passport.authenticate('local')(req, res, function () {
              res.redirect('/dashboard')
          })
      }

  )
});

/**
 * Show login page
 */
router.get('/login',function(req,res,next){
    res.render('login');
});
/**
 * on success login, redirect to dashboard.
 */
router.post('/login', passport.authenticate('local'),function (req,res){

 res.redirect('/dashboard')

});

router.get('/logout', function(req,res,next){
    req.session.destroy(() =>{
        res.redirect('/login')
    })
})


module.exports = router;
