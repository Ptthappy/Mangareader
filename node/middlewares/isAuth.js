const properties = require('../utilities/properties');
const usersHelper = require('../helpers/users');

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else{
        res.send({
            status: 403,
            response: 'Not logged in.'
        });
    }
};

module.exports.isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send({
            status: 403,
            response: 'Already logged in.'
        });
    } else {
        next();
    }
};

module.exports.checkEmail = (req, res, next) => {
    usersHelper.getEmail(req.body.email).then(data => {
        if(data)
            res.status(403).send("Email already in use");
        else
            next();
    }).catch(err => {
        console.log(err);
        res.status(500).send(properties.serverError);
    })
};

module.exports.checkUsername = (req, res, next) => {
    usersHelper.getUsername(req.body.username).then(data => {
        if(data)
            res.status(403).send("Username already in use");
        else
            next();
    }).catch(err => {
        console.log(err);
        res.status(500).send(properties.serverError);
    })
};