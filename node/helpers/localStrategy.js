let user = require('./users');
let LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy((username, password, done) => {
    console.log(username, password, done);

     user.authenticateUser(username, password).then(user => {
         if (user.error) {
             return done(null, false);
         }
         return done(null, user);
     }, err => {
         return done(null, false);
     });
});