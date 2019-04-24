let user = require('./users');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy({
    usernameField: 'ced',
    passwordField: 'password'
}, (ced, password, done) => {
    user.getUserByUsername(ced).then((user) => {
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