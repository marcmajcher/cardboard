var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var passport = require('passport');
var knex = require('../db/knex');

router.get('/', function(req, res) {
	res.render('index', {
		title: "Cardboard",
		user: req.user
	});
});

router.get('/main', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {

	knex('users').where({team_id: req.user.id}).first().then(function(userTeams) {
		knex.select().from('teams').then(function(teams) {
			console.log("+++TEAMS:");
			console.log(teams);
			console.log("+++")

			res.render('main', {
				title: "Cardboard",
				user: req.user,
				userTeams: userTeams,
				teams: teams
			});
		});
	});
});

// create a new team
router.post('/team', function(req, res) {
	console.log('--- inserting team: '+req.body.teamName);
	knex('teams').insert({name: req.body.teamName}).then(function() {
		res.redirect('/main');
	});
});

// add user to team
router.put('/joinTeam', function(req, res) {

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
