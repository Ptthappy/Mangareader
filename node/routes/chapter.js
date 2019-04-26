const express = require('express');
const auth = require('../middlewares/isAuth');
const multer = require('multer')
const diskStorage = require('../utilities/diskStorage')
const upload = multer({ storage: diskStorage.storage })
const checkManga = require('../middlewares/checkManga')
const chapterHelper = require('../helpers/chapter')

let router = express.Router();

router.post('/:id/addChapter', auth.isAuth, checkManga.checkId, upload.array("chapters", 20), (req, res) => {
    const files = req.files
    diskStorage.resetCount()
    if(!files) {
        res.status(409).send('Please upload file(s) of chapter.')
    }
    chapterHelper.addChapter(req.params.id, req.body).then(data => {
        //TODO: esto xd
    })
})

module.exports = router