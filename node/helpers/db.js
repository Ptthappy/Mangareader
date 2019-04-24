const config = require('./config');
const pgp = require('pg-promise')();
const db = pgp(config.dbUrl);

module.exports = db;