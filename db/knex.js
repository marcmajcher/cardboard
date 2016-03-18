var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
knex = require('knex')(config);

knex.migrate.latest([config])
	.then(function() {
		return knex.seed.run();
	})
	.then(function() {
		console.log("* db migrated and seeded.")
	});

module.exports = knex;
