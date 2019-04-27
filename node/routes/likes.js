const express = require('express');
const auth = require('../middlewares/isAuth');
const likes = require('../helpers/likes');
const mangaFilter = require('../middlewares/mangaFilter')
let router = express.Router();

//Get manga likes
router.get('/:mangaId/likes', mangaFilter.checkId, (req, res) => {
    likes.getMangaLikes(req.params.mangaId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Likes Returned',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err
        })
    })
});

//Get chapter likes
router.get('/:mangaId/chapter/:chapterId/likes', auth.isAuth, mangaFilter.checkChapterToGet, (req, res) => {
    likes.getChapterLikes(req.params.chapterId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Likes Returned',
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: err
        });
    });
});

//Do manga like
router.post('/:mangaId/likes', auth.isAuth, mangaFilter.checkId, (req, res) => {
    likes.likeManga(req.user.id, req.params.mangaId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Manga liked'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            status: 500,
            message: 'Could not like manga'
        });
    });
});

//Do chapter like
router.post('/:mangaId/chapter/:chapterId/likes', auth.isAuth, mangaFilter.checkId, (req, res) => {
    likes.likeChapter(req.user.id, req.params.chapterId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Chapter liked'
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not like chapter'
        });
    });
});

//Delete manga like
router.delete('/:mangaId/likes', auth.isAuth, mangaFilter.checkId, (req, res) => {
    likes.deleteLike(req.body.likeId, true).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Manga disliked'
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not dislike manga'
        });
    });
});

//Delete chapter like
router.delete('/:mangaId/chapter/:chapterId/likes', auth.isAuth, (req, res) => {
    likes.deleteLike(req.body.likeId, false).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Chapter disliked'
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not dislike chapter'
        });
    });
});

module.exports = router;