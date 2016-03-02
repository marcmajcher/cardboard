var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var passport = require('passport');

// var connectionString = require(path.join(__dirname, '../', '../', 'config'));

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../views', 'index.html'));
});


router.get('/login/twitter',
	passport.authenticate('twitter'));

router.get('/login/twitter/return',
	passport.authenticate('twitter', {
		failureRedirect: '/'
	}),
	function(req, res) {
		res.redirect('/');
	});

router.get('/profile',
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res) {
		res.render('profile', {
			user: req.user
		});
	});


module.exports = router;