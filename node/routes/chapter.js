const express = require('express');
const auth = require('../middlewares/isAuth');
const multer = require('multer')
const upload = multer({ dest: 'assets/' })
let router = express.Router();

router.post('/add', auth.isAuth, upload.array('chapters', 10), (req, res) => {
    const files = req.files
    if(files.length === 0) {
        res.status(409).send("Please upload file(s) of chapter.")
    }
    
    res.sendStatus(200)
})

module.exports = router