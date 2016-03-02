# cardboard
Simple task board with lanes for groups

## Purpose
Demonstrate understanding of curriculum content by designing, implementing, and deploying a simple webapp using core technologies

- Postgres SQL
	- Knex.js
- Express
	- Passport
- Angular
	- UI-Router
- Bootstrap
- Heroku (paas)

## Overview

Cardboard will be a simple process board to organize tasks for people on a team. There will be two main sections, one for the team and the team members, and one for extra-process tasks. Users will be able to create an account, sign in, and join a team. (For simplicity, a user will only belong to one team, which will be their default view.) 

The team will be able to add, view, and move tasks between the holding areas (backlog, icebox, and graveyard) and the active process lanes (today, tomorrow, and later) for the entire team, or for individual users. Cards will be manually managed - "tomorrow" cards will not automatically move to "today", for example. Cards may be deleted manually, or moved to the graveyard when completed. 


## Setup

- Set up Express app
- Set up Angular app w/UI-Router
- Set up Postgres SQL w/Knex.js
- Use Bootstrap on front end
- Set up social auth w/Passport
- Deploy to Heroku

## Data Structure

- User
	- Id
	- Name
	- Description
	- Email
	- Team Id

- Team
	- Id
	- User Ids
	- Icebox
	- Backlog
	- Graveyard
	- Active

- Card
	- Id
	- Description
	- State (backlog/icebox/graveyard/today/tomorrow/later)
	- Team Id
	- User Id (may be null)

## Actions

	- Create user
	- Authenticate user (login)
	- Log out user
	- Add user to team
	- Edit user info
	- Create card
	- Edit card
	- Move card (assign state/assign to user)
	- Delete card



## REST Endpoints

	
## User Flow

	- Log in with passport/social (google)
	

### Log

	- Set up Postgress.app (http://postgresapp.com/)
	- Get knex: http://knexjs.org/
	- Get passport: http://passportjs.org/

	- Reference: 
		- https://www.npmjs.com/package/pg
		- http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
		- https://devcenter.heroku.com/articles/heroku-postgresql
		- http://dnyy.sg/a-postgresql-backend-service-on-node-js-with-express-and-bookshelf-js/


