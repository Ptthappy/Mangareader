const express = require('express');
const auth = require('../middlewares/isAuth');
const likes = require('../helpers/likes');
let router = express.Router();

//Get manga likes
router.get('/:mangaId/likes', (req, res) => {
    likes.getMangaLikes(req.params.mangaId).then(data => {
        res.status(200).send({
            message: 'Likes Returned',
            data: data
        });
    });
});

//Get chapter likes
router.get('/:mangaId/chapter/:chapterId/likes', (req, res) => {
    likes.getChapterLikes(req.params.chapterId).then(data => {
        res.status(200).send({
            message: 'Likes Returned',
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err
        });
    });
});

//Do manga like
router.post('/:mangaId/likes', auth.isAuth, (req, res) => {
    likes.likeManga(req.user.id, req.params.mangaId).then(data => {
        res.status(200).send({
            message: 'Manga liked'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Could not like manga'
        });
    });
});

//Do chapter like
router.post(':mangaId/chapter/:chapterId/likes', auth.isAuth, (req, res) => {
    likes.likeChapter(req.user.id, req.params.chapterId).then(data => {
        res.status(200).send({
            message: 'Chapter liked'
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not like chapter'
        });
    });
});

//Delete manga like
router.delete('/:mangaId/likes', auth.isAuth, (req, res) => {
    likes.deleteLike(req.body.likeId, true).then(data => {
        res.status(200).send({
            message: 'Manga disliked'
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not dislike manga'
        });
    });
});

//Delete chapter like
router.delete(':mangaId/chapter/:chapterId/likes', auth.isAuth, (req, res) => {
    likes.deleteLike(req.body.likeId, false).then(data => {
        res.status(200).send({
            message: 'Chapter disliked'
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not dislike chapter'
        });
    });
});

module.exports = router;