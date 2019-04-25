const express = require('express');
const app = express();
const properties = require('./utilities/properties');

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

passport.use(require('./helpers/localStrategy'));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.listen(properties.port, () => {
	console.log('Listening on port ' + properties.port);
});