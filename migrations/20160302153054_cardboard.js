exports.up = function(knex, Promise) {

	return knex.schema.createTable('teams', function(table) {
	    table.increments('id').primary();
	    table.string('name');
	}).then(function() {
	    return knex.schema.createTable('users', function(table) {
	    	table.increments('uid').primary();
				table.string('remoteId');
	      table.string('username');
	      table.string('name');
	      table.string('email');
        table.integer('team_id')
	      	.references('id')
	        .inTable('teams');
	      table.timestamps();
	    });
	}).then(function() {
	    return knex.schema.createTable('cards', function(table) {
	      table.increments('id').primary();
	      table.string('content');
	      table.integer('author_id')
	        .references('uid')
	        .inTable('users');
        table.integer('team_id')
	        .references('id')
	        .inTable('teams');
	      table.dateTime('postDate');
	    });
	});
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('users'),
		knex.schema.dropTableIfExists('teams'),
		knex.schema.dropTableIfExists('cards')
	])
};
