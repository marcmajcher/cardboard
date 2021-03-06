var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var routes = require('./routes/index');
require('dotenv').load();

var app = express();
var knex = require('./db/knex');

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
// TBD: is there a better place for this to live?
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK + '/login/twitter/return'
  },
  function(token, tokenSecret, profile, callback) {
    // console.log("  GOT USER: "+profile.username);

    // TBD use transaction? whereNotExists?
    knex('users').where({remoteId: profile.id}).select('*').then(function(records) {
      console.log("** RECORDS: "+records.length);
      console.log(records);
      if (records.length === 0) {
        // console.log("  INSERTING BECAUSE WHY NOT");
        knex('users').insert({
          remoteId: profile.id,
          username: profile.username,
          name: profile.displayName
        }).then(function() {
          // console.log("  * Inserted user: "+profile.username);
          return callback(null, profile);
        })
      }
      else {
        // console.log("  NO INSERT");
        return callback(null, profile);
      }
    });

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
