const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
let router = express.Router();

router.post('/login', auth.isLogged, passport.authenticate('local'), (req, res) => {

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