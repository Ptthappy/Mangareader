const express = require('express');
const app = express();
const config = require('helpers/config');

let session = require('express-session');
let passport = require('passport');

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
	secret:'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(3000);