const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
const mangaHelper = require('../helpers/manga');
const bcrypt = require('bcryptjs')
let router = express.Router();

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

router.delete('/delete', auth.isAuth, (req, res) => {
    const mangaId = req.body.id
    const userId = req.user.id
    mangaHelper.deleteManga(mangaId, userId).then(rowsAffected => {
        if(rowsAffected === 1) {
            res.status(200).send("Manga deleted successfully.")
        }
        else {
            res.status(403).send("Could not delete manga. May be because you are not the owner of the manga or manga doesn't exists.")
        }
    }, err => {
        res.status(500).send("Error while deleting manga.")
    })
})

module.exports = router