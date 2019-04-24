const db = require('./db');
const bcrypt = require('bcryptjs');
// const reader = require('properties-reader');
const properties = require('./properties.js');

module.exports.authenticateUser = (username, password) => {
   bcrypt.hash(password, 10).then(hashed => {
       password = hashed;
   }).catch(err => {
       console.log(err);
   });

    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.login, [username, password]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                rej(err);
            });
        }).catch(err => {
            rej(err);
        });
    })
};
