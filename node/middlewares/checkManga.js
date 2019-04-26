const mangaHelper = require('../helpers/manga')
const chapterHelper = require('../helpers/chapter')

module.exports.checkId = (req, res, next) => {
    mangaHelper.getManga(req.params.mangaId).then(data => {
        if(req.isAuthenticated()) {
            if(data.manga.user.id === req.user.id) {
                next()
            }
            else {
                res.status(401).send('You are not the owner of the manga.')
            }
        }
        else {
            next()
        }
    }, err => {
        res.status(404).send('Manga with id ' + req.params.mangaId + ' not found.')
    })
}

module.exports.checkChapterToUp = (req, res, next) => {
    const mangaId = req.params.mangaId
    const chapterNumber = req.query.number
    chapterHelper.checkChapter(mangaId, chapterNumber).then(exists => {
         if(exists) {
            res.status(409).send("Chapter " + chapterNumber + " already exists.")
        }
        else {
            next()
        }
    })
}

module.exports.checkChapterToGet = (req, res, next) => {
    const mangaId = req.params.mangaId
    const chapterNumber = req.params.chapterId  
    chapterHelper.checkChapter(mangaId, chapterNumber).then(exists => {
         if(!exists) {
            res.status(409).send("Chapter " + chapterNumber + " doesn't exists in manga " + mangaId + ".")
        }
        else {
            next()
        }
    })
}