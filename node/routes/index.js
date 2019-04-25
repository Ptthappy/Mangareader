const express = require('express');
const router = express.Router();

router.use('/auth', require('./session'));
router.use('/manga', require('./manga'));
// router.use('/likes', require('./likes'));
// router.use('/comments', require('./comments'));

module.exports = router;
