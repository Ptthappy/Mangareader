const express = require('express');
const router = express.Router();

router.use('/auth', require('./session'));
router.use('/manga', require('./manga'));
router.use('/chapter', require('./chapter'))
router.get('/dashboard', (req, res) => {
    if(req.isAuthenticated()) {
        res.status(200).send("logged")
    }
    
})
// router.use('/likes', require('./likes'));
// router.use('/comments', require('./comments'));

module.exports = router;
