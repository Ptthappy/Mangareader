const express = require('express');
const auth = require('../middlewares/isAuth');
const mangaHelper = require('../helpers/manga');
const mangaFilter = require('../middlewares/mangaFilter')
const rimraf = require('rimraf')
const fs = require('fs')
let router = express.Router();

router.use('/', require('./chapter'));
router.use('/', require('./likes'));
router.use('/', require('./comments'));

router.get('/:id', (req, res) => {
    const id = req.params.id
    mangaHelper.getManga(id).then(response => {
        res.status(response.status).send({ status: response.status, message: 'Manga returned.', data: response.manga })
    }, err => res.status(err.status).send({ status: err.status, message: err.message }) )
})

router.post('/add', auth.isAuth, (req, res) => {
    const manga = req.body
    manga.userId = req.user.id
    mangaHelper.addManga(manga).then(data => {
        data.user = req.user
        res.status(200).send({
            status: 200,
            message: "Added manga successfully.",
            data: data
        })
    }, err => {
        res.status(500).send({ status: 500, messsage: "Could not add manga." })
    })
})

router.delete('/delete', auth.isAuth, mangaFilter.checkOwnership,  (req, res) => {
    const mangaId = req.query.id
    const userId = req.user.id
    mangaHelper.deleteManga(mangaId, userId).then(rowsAffected => {
        if(rowsAffected === 1) {
            if(fs.existsSync("assets/manga" + mangaId)) rimraf("assets/manga" + mangaId, () => {})
            res.status(200).send({ status: 200, message: "Manga deleted successfully." })
        }
        else {
            res.status(403).send({ status: 403, message: "Could not delete manga. May be because you are not the owner of the manga or the manga doesn't exists." })
        }
    }, err => {
        res.status(500).send({ status: 500, message: "Error while deleting manga." })
    })
})

router.put('/modify', auth.isAuth, mangaFilter.checkOwnership, (req, res) => {
    const manga = req.body
    const userId = req.user.id
    mangaHelper.modifyManga(manga, userId).then(count => {
        if(count === 1) {
            res.status(200).send({
                status: 200,
                message: "Updated manga successfully.",
                data: manga
            })
        }
        else {
            res.status(403).send({ status: 403, message: "Could not update manga. May be because you are not the owner of the manga or the manga doesn't exists." })
        }
    }, err => {
        res.status(500).send({ status: 500, message: "Error while updating manga." })
    })
})

router.get('/search/:by', (req, res) => {
    const by = req.params.by
    const toSearch = req.query.query
    mangaHelper.search(by, toSearch).then(results => {
        res.status(200).send({
            status: 200,
            message: "Found " + results.length + " matches.",
            data: results
        })
    }, err => {
        res.status(500).send({ status: 500, message: "Error while searching." })
    })
})

router.get('/:mangaId/subscribe', auth.isAuth, mangaFilter.checkId, mangaFilter.checkSubscribe, (req, res) => {
    const mangaId = req.params.mangaId
    const userId = req.user.id
    mangaHelper.subscribe(mangaId, userId).then(() => {
        res.status(200).send({ status: 200, message: 'Subscribed to manga successfully.' })
    }, err => {
        res.status(500).send({ status: 500, message: err })
    })
})

router.get('/:mangaId/unsubscribe', auth.isAuth, mangaFilter.checkId, mangaFilter.checkUnsubscribe, (req, res) => {
    const mangaId = req.params.mangaId
    const userId = req.user.id
    mangaHelper.unsubscribe(mangaId, userId).then(() => {
        res.status(200).send({ status: 200, message: "Unsubscribed from manga successfully." })
    }, err => {
        res.status(500).send({ status: 500, message: err })
    })
})

router.put('/:mangaId/end', auth.isAuth, mangaFilter.checkId, mangaFilter.checkOwnership, (req, res) => {
    mangaHelper.endManga(req.params.mangaId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Manga terminated'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            status: 500,
            message: 'Could not terminate manga'
        });
    });
});

module.exports = router;