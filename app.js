/*
File Name: app.js
Author: Jakub Sykora Nicholas Gardner
Website: https://ticketsystem2106.herokuapp.com/
Description: page that sets up the server
*/


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require ('mongoose');
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account');
var passport = require('passport');
var session = require('express-session');


var app = express();



//DB connection
mongoose.connect(
    'mongodb+srv://jakub:jakub@cluster0-anjsc.mongodb.net/test?retryWrites=true',
    {
      useNewUrlParser: true
    }
);
var con = mongoose.connection;

con.once('open', () =>{
  console.log('Connected');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '1bea23f58d718fd871c16e6594a4996c',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))



app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
