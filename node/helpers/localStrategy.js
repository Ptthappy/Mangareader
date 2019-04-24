let user = require('./users');
let LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    user.getUserByUsername(username).then((user) => {
        if (user.error) {
            return done(null, false);
        }

        user.comparePassword(password, user.password).then((isMatch) => {
            if (isMatch)
                return done(null, user);
            else
                return done(null, false);
        }).catch((err) => {
            return done(null, false);
        });

    }).catch((err)=>{
        return done(null, false);
    });
});