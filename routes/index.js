var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res) {
	res.render('index', {
		user: req.user
	});
});

router.get('/main',
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res) {
		res.render('main', {
			user: req.user
		});
	});
	
// Authentication routes

router.get('/login/twitter',
	passport.authenticate('twitter'));

router.get('/login/twitter/return',
	passport.authenticate('twitter', {
		failureRedirect: '/'
	}),
	function(req, res) {
		res.redirect('/main');
	});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


module.exports = router;
