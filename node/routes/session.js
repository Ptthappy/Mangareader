const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
const users = require('../helpers/users');
const bcrypt = require('bcryptjs');
let router = express.Router();

router.post('/login', auth.isLogged, passport.authenticate('local'), (req, res) => {
    res.status(200).send("Logged in successfully.")
});

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout();
    res.status(200).send({
        status: 'Bye!'
    });
});

router.post('/register', (req, res) => {
    console.log(req.body);
    let user = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
        })
    });
    
    users.register(user).then(data => {
        res.status(200).send(data)
    }, err => {
        res.status(500).send(err)
    })
});

router.put('/modify', (req, res) => {
    let user = req.body;
    console.log(req.user);
    user.userId = Number.parseInt(user.userId);
    console.log(req.body);
    users.modify(user).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
});

module.exports = router;