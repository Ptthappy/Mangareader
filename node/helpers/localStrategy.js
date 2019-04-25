let userHelper = require('./users');
let LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy((username, password, done) => {
     userHelper.getUserByUsername(username).then(user => {
        const beautifulUser = {
            id: user.user_id,
            username: user.user_username,
            name: user.user_name,
            typeId: user.type_id,
            creationTime: new Date(user.user_creation_time).getTime(),
            email: user.user_email
        }
         if (user.error) {
             return done(null, false);
         }
         userHelper.comparePassword(password, user.user_password).then(isMatch => {
             if(isMatch) {
                 return done(null, beautifulUser)
             }
             else {
                 return done(null, false)
             }
         })
     }, err => {
         return done(null, false);
     });
});