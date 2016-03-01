var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/cardboard';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE cards(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });