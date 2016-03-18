var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var passport = require('passport');
var knex = require('../db/knex');
var User = knex('users');
var Team = knex('teams');

router.get('/', function(req, res) {
	res.render('index', {
		title: "Cardboard",
		user: req.user
	});
});

router.get('/main', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
	User.where({team_id: req.user.id}).first().then(function(userTeams) {
		Team.select().then(function(teams) {

			console.log("+++TEAMS:");
			console.log(teams);

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
	Team.insert({name: req.body.teamName}).then(function() {
		res.redirect('/main');
	});
});


/*
Okay, it looks like User is caching the insert, and doing it again instead of
the select in get('/main'). Why?

--- inserting team: team rocket
{ method: 'insert',
  options: {},
  bindings: [ 'team rocket' ],
  sql: 'insert into "teams" ("name") values (?)',
  returning: undefined }
POST /team 302 107.013 ms - 54
{ method: 'first',
  options: {},
  bindings: [ '1289051', '1289051', 1 ],
  sql: 'select * from "users" where "team_id" = ? and "team_id" = ? limit ?' }
{ method: 'insert',
  options: {},
  bindings: [ 'team rocket' ],
  sql: 'insert into "teams" ("name") values (?)',
  returning: undefined }
+++TEAMS:
{ command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [],
  fields: [],
  _parsers: [],
  RowCtor: null,
  rowAsArray: false,
  _getTypeParser: [Function: bound ] }
GET /main 500 765.864 ms - 3526
*/

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
