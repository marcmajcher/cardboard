var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var routes = require('./routes/index');

var app = express();
var db = require('./models/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'draobdrac', resave: true, saveUninitialized: true }));


// set up passport twitter auth
passport.use(new TwitterStrategy({
    consumerKey: '5ZVjC2NQC9Z1H7evldoWizayd',
    consumerSecret: 'aHE74ykuUiu1ImsIM324LAaeK1LPPuWVQtQNdvKPj22l7o1A5E',
    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(token, tokenSecret, profile, callback) {
    // User.findOrCreate({ twitterId: profile.id }, function(err, user) {
    //   return callback(err, user);
    // });

    return callback(null, profile);
  }));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(user, callback) {
  callback(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;