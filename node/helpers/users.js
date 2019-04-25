const db = require('../utilities/db');
const bcrypt = require('bcryptjs');
const properties = require('../utilities/properties');

module.exports.getUserByUsername = (username) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.login, [username]).then(user => {
                res(user);
                obj.done();
            }).catch(err => {
                rej(err);
            });
        }).catch(err => {
            rej(err);
        });
    })
};

module.exports.register = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.register, [user.username, user.name, user.password, user.email]).then(user => {
                const beautifulUser = {
                    id: user.user_id,
                    username: user.user_username,
                    name: user.user_name,
                    typeId: user.type_id,
                    creationTime: new Date(user.user_creation_time).getTime(),
                    email: user.user_email
                }
                res(beautifulUser)
                obj.done()
            }).catch(err => {
                rej(err);
            })
        }).catch(err => {
            rej(err);
        })
    })
};

module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if(err) throw rej(err);
            res(isMatch);
        })
    })
};

module.exports.modify = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyUserData, [user.username, user.name, user.userId]).then(data => {
                res(user);
                obj.done();
            }).catch(err => {
                console.log(err);
                rej("Database Error");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};