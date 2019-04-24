const db = require('./db');
const bcrypt = require('bcryptjs');
// const reader = require('properties-reader');
const properties = require('./properties.js');

module.exports.authenticateUser = (username, password) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            // obj.one(properties.login)
        });
    })
};

//Esto hay que quitarlo
module.exports.getUserByUsername = (username) => {
    return new Promise((res,rej) => {
        db.connect().then((obj) => {
            obj.one('SELECT * FROM test where ced = $1',[username]).then((data) => {
                res(data);
                obj.done();
            }).catch((error) => {
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
};

module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res,rej) => {
        let hashedPass = bcrypt.hashSync(hash, 10);
        bcrypt.compare(candidatePassword, hashedPass, (err, isMatch) => {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

