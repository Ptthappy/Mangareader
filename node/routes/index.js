const express = require('express');
const router = express.Router();

router.use('/session', require('./session'));

module.exports = router;
