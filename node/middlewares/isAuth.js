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