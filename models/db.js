var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
module.exports = knex;

knex.migrate.latest([config])
	.then(function() {
		return knex.seed.run();
	})
	.then(function() {
		console.log("* db migrated and seeded.")
	});