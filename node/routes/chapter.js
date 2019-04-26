const express = require('express');
const auth = require('../middlewares/isAuth');
const multer = require('multer')
const diskStorage = require('../utilities/diskStorage')
const upload = multer({ storage: diskStorage.storage })
const mangaFilter = require('../middlewares/mangaFilter')
const chapterHelper = require('../helpers/chapter')
const fs = require('fs')

let router = express.Router();

router.post('/:mangaId/addChapter', auth.isAuth, mangaFilter.checkOwnership, mangaFilter.checkChapterToUp, mangaFilter.checkMangaStatus, upload.array('files', 100), (req, res) => {
    const files = req.files
    diskStorage.resetCount()
    req.body.number = req.query.number
    req.body.numberPages = files.length
    if(!files) {
        res.status(409).send('Please upload file(s) of chapter.')
    }
    chapterHelper.addChapter(req.params.mangaId, req.body).then(data => {
        res.status(200).send(data)
    }, err => {
        fs.rmdirSync('assets/manga' + req.params.mangaId + "/chapter" + req.query.number + "/")
        res.status(500).send(err)
    })
})

router.get('/:mangaId/chapter/:chapterId', mangaFilter.checkId, mangaFilter.checkChapterToGet, (req, res) => {
    const mangaId = req.params.mangaId
    const chapterId = req.params.chapterId
    chapterHelper.getChapter(mangaId, chapterId).then(data => {
        res.status(200).send(data)
    }, err => {
        res.status(500).send(err)
    })
})

router.get('/:mangaId/chapters', mangaFilter.checkId, (req, res) => {
    const mangaId = req.params.mangaId
    chapterHelper.getChaptersOfManga(mangaId).then(data => {
        res.status(200).send(data)
    }, err => {
        res.status(500).send(err)
    })
})

router.delete('/:mangaId/deleteChapter', auth.isAuth, mangaFilter.checkOwnership, mangaFilter.checkChapterToGet, mangaFilter.checkMangaStatus, (req, res) => {
    const mangaId = req.params.mangaId
    const chapterNumber = req.query.number
    chapterHelper.deleteChapter(mangaId, chapterNumber).then(data => {
        res.status(200).send(data)
    }, err => {
        res.status(500).send(err)
    })
})

router.get('/:mangaId/chapter/:chapterId/page/:page', mangaFilter.checkId, mangaFilter.checkChapterToGet, mangaFilter.checkPage, (req, res) => {
    const mangaId = req.params.mangaId
    const number = req.params.chapterId
    const page = req.params.page
    const filename = (page - 1) + ".png"
    fs.createReadStream('assets/manga' + mangaId + '/chapter' + number + "/" + filename).pipe(res)
})

module.exports = router