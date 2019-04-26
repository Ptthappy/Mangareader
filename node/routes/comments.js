const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
const comments = require('../helpers/comments');
let router = express.Router();

//Get manga comments
router.get('/:mangaId/comments', (req, res) => {
    comments.getMangaComments(req.params.mangaId).then(data => {
        res.status(200).send({
            message: 'Comments returned',
            data: data
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Could not get comments'
        });
    });
});


//Get chapter comments
router.get('/:mangaId/chapter/:chapterId/comments', (req, res) => {
    comments.getMangaComments(req.params.chapterId).then(data => {
        res.status(200).send({
            message: 'Comments returned',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not get comments'
        });
    });
});

//Comment manga
router.post('/:mangaId/comments', auth.isAuth, (req, res) => {
    comments.commentManga(req.user.id, req.params.mangaId, req.body.commentContent)
        .then(data => {
        res.status(200).send({
            message: 'Manga commented',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not comment manga'
        });
    });
});

//Comment chapter
router.post('/:mangaId/chapter/:chapterId/comments', (req, res) => {
    comments.commentChapter(req.user.id, req.params.chapterId, req.body.commentContent)
        .then(data => {
        res.status(200).send({
            message: 'Chapter commented',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not comment chapter'
        });
    });
});

//Modify manga comment
router.put('/:mangaId/comments', (req, res) => {
    comments.modifyMangaComment(req.body.commentId, req.body.commentContent).then(data => {
        res.status(200).send({
            message: 'Comment modified',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not modify comment'
        });
    });
});

//Modify chapter comment
router.put('/:mangaId/chapter/:chapterId/comments', (req, res) => {
    comments.modifyChapterComment(req.params.chapterId, req.body.commentContent).then(data => {
        res.status(200).send({
            message: 'Comment modified',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not modify comment'
        });
    });
});

//Delete manga comment
router.delete('/:mangaId/comments', (req, res) => {
    comments.deleteMangaComment(req.body.commentId).then(data => {
        res.status(200).send({
            message: 'Comment deleted',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not delete comment'
        });
    });
});

//Delete chapter comment
router.delete('/:mangaId/chapter/:chapterId/comments', (req, res) => {
    comments.deleteChapterComment(req.body.commentId).then(data => {
        res.status(200).send({
            message: 'Comment deleted',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: 'Could not delete comment'
        });
    });
});

module.exports = router;