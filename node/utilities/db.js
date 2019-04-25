const props = require('./properties');
const pgp = require('pg-promise')();
const db = pgp(props.dbUrl);

module.exports = db;