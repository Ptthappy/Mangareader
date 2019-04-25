const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
const userHelper = require('../helpers/users');
const bcrypt = require('bcryptjs')
let router = express.Router();

router.post('/login', auth.isLogged, passport.authenticate('local'), (req, res) => {
    res.status(200).send({
        message: "Logged in successfully.",
        user: req.user
    })
});

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout()
    res.status(200).send("Logged out successfully");
});

router.post('/register', auth.isLogged, (req, res) => {
    let user = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
        })
    })
    
    userHelper.register(user).then(data => {
        req.login(user, err => {})
        delete data.password
        res.status(200).send(data)
    }, err => {
        res.status(500).send(err)
    })
});

router.put('/modify', (req, res) => {

});

module.exports = router;