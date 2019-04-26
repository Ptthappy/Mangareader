const express = require('express');
const auth = require('../middlewares/isAuth');
const mangaHelper = require('../helpers/manga');
const mangaFilter = require('../middlewares/mangaFilter')
let router = express.Router();

router.use('/', require('./chapter'))

router.get('/:id', (req, res) => {
    const id = req.params.id
    mangaHelper.getManga(id).then(response => {
        res.status(response.status).send(response.manga)
    }, err => res.status(err.status).send(err.message) )
})

router.post('/add', auth.isAuth, (req, res) => {
    const manga = req.body
    manga.userId = req.user.id
    mangaHelper.addManga(manga).then(data => {
        data.user = req.user
        res.status(200).send({
            message: "Added manga successfully.",
            manga: data
        })
    }, err => {
        res.status(500).send("Could not add manga.")
    })
})

router.delete('/delete', auth.isAuth, mangaFilter.checkOwnership,  (req, res) => {
    const mangaId = req.query.id
    const userId = req.user.id
    mangaHelper.deleteManga(mangaId, userId).then(rowsAffected => {
        if(rowsAffected === 1) {
            res.status(200).send("Manga deleted successfully.")
        }
        else {
            res.status(403).send("Could not delete manga. May be because you are not the owner of the manga or the manga doesn't exists.")
        }
    }, err => {
        res.status(500).send("Error while deleting manga.")
    })
})

router.put('/modify', auth.isAuth, mangaFilter.checkOwnership, (req, res) => {
    const manga = req.body
    const userId = req.user.id
    mangaHelper.modifyManga(manga, userId).then(count => {
        if(count === 1) {
            res.status(200).send({
                message: "Updated manga successfully.",
                manga: manga
            })
        }
        else {
            res.status(403).send("Could not update manga. May be because you are not the owner of the manga or the manga doesn't exists.")
        }
    }, err => {
        res.status(500).send("Error while updating manga.")
    })
})

router.get('/search/:by', (req, res) => {
    const by = req.params.by
    const toSearch = req.query.query
    mangaHelper.search(by, toSearch).then(results => {
        res.status(200).send({
            message: "Found " + results.length + " matches.",
            results: results
        })
    }, err => {
        res.status(500).send("Error while searching.")
    })
})

module.exports = router