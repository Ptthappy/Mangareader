const express = require('express');
const dashboardHelper = require('../helpers/dashboard')
const router = express.Router();

router.use('/auth', require('./session'));
router.use('/manga', require('./manga'));
router.get('/dashboard', (req, res) => {
    if(req.isAuthenticated()) {
        dashboardHelper.getLoggedDashboard(req.user.id).then(data => {
            res.status(200).send(data)
        }, err => {
            res.status(500).send(err)
        })
    }
    else {
        dashboardHelper.getRecentDashboard().then(data => {
            res.status(200).send(data)
        }, err => {
            res.status(500).send(err)
        })
    }
    
})
// router.use('/likes', require('./likes'));
// router.use('/comments', require('./comments'));

module.exports = router;
