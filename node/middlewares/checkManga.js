const mangaHelper = require('../helpers/manga')

module.exports.checkId = (req, res, next) => {
    mangaHelper.getManga(req.params.id).then(data => {
        if(data.manga.user.id === req.user.id) {
            next()
        }
        else {
            res.status(401).send('You are not the owner of the manga.')
        }
    }, err => {
        res.status(404).send('Manga with id ' + req.params.id + ' not found.')
    })
}