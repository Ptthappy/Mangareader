const express = require('express');
const router = express.Router();

router.use('/auth', require('./session'));
router.use('/manga', require('./manga'));

module.exports = router;
