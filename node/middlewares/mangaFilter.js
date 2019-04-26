const mangaHelper = require('../helpers/manga')
const chapterHelper = require('../helpers/chapter')

module.exports.checkOwnership = (req, res, next) => {
    const mangaId = typeof req.params.mangaId === 'undefined' ? typeof req.query.id === 'undefined' ? req.body.id : req.query.id : req.params.mangaId
    mangaHelper.getManga(mangaId).then(data => {
        if(data.manga.user.id === req.user.id) {
            next()
        }
        else {
            res.status(401).send('You are not the owner of the manga.')
        }
    }, err => {
        res.status(404).send('Manga with id ' + mangaId + ' not found.')
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
    const chapterNumber = typeof req.params.chapterId === 'undefined' ? req.query.number : req.params.chapterId  
    chapterHelper.checkChapter(mangaId, chapterNumber).then(exists => {
         if(!exists) {
            res.status(409).send("Chapter " + chapterNumber + " doesn't exists in manga " + mangaId + ".")
        }
        else {
            next()
        }
    })
}

module.exports.checkId = (req, res, next) => {
    mangaHelper.getManga(req.params.mangaId).then(data => {
        next()
    }, err => {
         res.status(404).send('Manga with id ' + req.params.mangaId + ' not found.')
    })
}

module.exports.checkMangaStatus = (req, res, next) => {
    mangaHelper.getMangaStatus(req.params.mangaId).then(status => {
        if(!status) { next() }
        else { 
            res.status(409).send("Manga is set as ended. Modify it's status to allow changes.")
        } 
    })
}

module.exports.checkPage = (req, res, next) => {
    const mangaId = req.params.mangaId
    const number = req.params.chapterId
    const page = req.params.page
    chapterHelper.getChapter(mangaId, number).then(result => {
        const pagesN = result.pages
        if(page >= 1 && page <= pagesN) { next() }
        else {
            res.status(404).send("Page " + page + " doesn't exists in Chapter " + number)
        }
    })
}

module.exports.checkSubscribe = (req, res, next) => {
    const mangaId = req.params.mangaId
    const userId = req.user.id
    mangaHelper.alreadySubscribed(mangaId, userId).then(subscribed => {
        if(subscribed) {
            res.status(409).send("Already subscribed to the manga.")
        }
        else {
            next()
        }
    })
}

module.exports.checkUnsubscribe = (req, res, next) => {
    const mangaId = req.params.mangaId
    const userId = req.user.id
    mangaHelper.alreadySubscribed(mangaId, userId).then(subscribed => {
        if(subscribed) {
            next()
        }
        else {
            res.status(409).send("You are not subscribed to that manga.")
        }
    })
}