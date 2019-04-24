let user = require('./users');
let LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy((username, password, done) => {
     user.authenticateUser(username, password).then(data => {
         if (data.error) {
             return done(null, false);
         }
         user.comparePassword(password, data.user_password).then(isMatch => {
             if(isMatch) {
                 return done(null, user)
             }
             else {
                 return done(null, false)
             }
         })
     }, err => {
         return done(null, false);
     });
});