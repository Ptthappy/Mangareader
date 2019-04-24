const express = require('express');
const router = express.Router();

router.use('/auth', require('./session'));

module.exports = router;
