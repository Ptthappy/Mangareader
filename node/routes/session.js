const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
const users = require('../helpers/users');
const bcrypt = require('bcryptjs');
let router = express.Router();

router.post('/login', auth.isLogged, passport.authenticate('local'), (req, res) => {
    res.status(200).send({
        status: 200,
        message: "Logged in successfully.",
        user: req.user
    })
});

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout();
    res.status(200).send({ status: 200, message: "Logged out successfully" });
});

router.post('/register', auth.isLogged, (req, res) => {
    let user = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
        })
    });
    
    users.register(user).then(data => {
        req.login(data, err => {});
        delete data.password
        res.status(200).send({ status: 200, message: 'Signed up successfully.', data: data })
    }, err => {
        res.status(err.status).send({ status: err.status, message: err.message })
    })
});

router.put('/modify/:modify', auth.isAuth, auth.checkEmail, auth.checkUsername, (req, res) => {
    let modify = req.params.modify;
    let user = req.user;
    if(modify === 'user') {
        user.name = req.body.name;
        user.username = req.body.username;
        users.modify(user).then(data => {
            delete data.password;
            res.status(200).send({ status: 200, message: "Modified successfully.", data: data });
        }).catch(err => {
            res.status(500).send({ status: 500, message: err });
        });
    } else {
        if (modify === 'password') {
            users.getPassword(req.user.id).then(data => {
                users.comparePassword(req.body.oldPassword, data.user_password).then(isMatch => {
                    if(isMatch) {
                        req.user.password = req.body.newPassword;

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(req.user.password, salt, (err, hash) => {
                                users.changePassword(hash, req.user.id).then(data => {
                                    res.status(200).send({ status: 200, message: 'Password Changed Succesfully' })
                                }).catch(err => {
                                    res.status(500).send({ status: 500, message: 'Database Error' });
                                });
                            })
                        });
                    }
                    else
                        res.status(401).send({ status: 401, message: 'Wrong Password' })
                })
            }).catch(err => {
                res.status(500).send({ status: 500, message: err });
            });
        } else {
            if (modify === 'email') {
                user.email = req.body.email;

                users.changeEmail(user).then(data => {
                    res.status(200).send({ status: 200, message: 'Modified successfully.', data: data });
                }).catch(err => {
                    res.status(500).send({ status: 500, message: err });
                });
            } else
                res.status(400).send({ status: 400, message: 'Invalid parameters' })
        }
    }
});

router.get('/users', (req, res) => {
    let id = req.query.id;
    if(id !== undefined) {
        users.getUserById(id).then(data => {
            res.status(200).send({ status: 200, message: 'Users returned', data: data });
        }).catch(err => {
            res.status(500).send({ status: 500, message: err });
        });
    } else {
        let username = req.query.username;
        if(username !== undefined) {
            users.getUserById(username).then(data => {
                res.status(200).send({ status: 200, message: 'User returned', data: data });
            }).catch(err => {
                res.status(500).send({ status: 500, message: err });
            });
        } else {
            users.getUsers().then(data => {
                delete data.password;
                res.status(200).send({ status: 200, message: 'User returned', data: data });
            }).catch(err => {
                res.status(500).send({ status: 500, message: err });
            });
        }
    }
});

module.exports = router;