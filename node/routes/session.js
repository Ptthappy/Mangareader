const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
let router = express.Router();

router.post('/login', auth.isLogged, (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                err: info
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).send({
                    err: 'Could not log in user'
                });
            } res.status(200).send({
                status: 'Login successful!'
            });
        });
    });
});

router.get('/logout', auth.isAuth, (req, res) => {
    res.status(200).send({
        status: 'Bye!'
    });
});

router.post('/register', (req, res) => {

});

router.put('/modify', (req, res) => {

});

module.exports = router;