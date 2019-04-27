const express = require('express');
const auth = require('../middlewares/isAuth');
const comments = require('../helpers/comments');
const commentFilter = require('../middlewares/commentsFilter')
const mangaFilter = require('../middlewares/mangaFilter')
let router = express.Router();

//Get manga comments
router.get('/:mangaId/comments', mangaFilter.checkId, (req, res) => {
    comments.getMangaComments(req.params.mangaId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Comments returned',
            data: data
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            status: 500,
            message: 'Could not get comments'
        });
    });
});


//Get chapter comments
router.get('/:mangaId/chapter/:chapterId/comments', mangaFilter.checkId, mangaFilter.checkChapterToGet, (req, res) => {
    comments.getChapterComments(req.params.chapterId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Comments returned',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not get comments'
        });
    });
});

//Comment manga
router.post('/:mangaId/comments', auth.isAuth, mangaFilter.checkId, (req, res) => {
    comments.commentManga(req.user.id, req.params.mangaId, req.body.commentContent)
        .then(data => {
        res.status(200).send({
            status: 200,
            message: 'Manga commented',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not comment manga'
        });
    });
});

//Comment chapter
router.post('/:mangaId/chapter/:chapterId/comments', auth.isAuth, mangaFilter.checkId, mangaFilter.checkChapterToGet, (req, res) => {
    comments.commentChapter(req.user.id, req.params.chapterId, req.body.commentContent)
        .then(data => {
        res.status(200).send({
            status: 200,
            message: 'Chapter commented',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not comment chapter'
        });
    });
});

//Modify manga comment
router.put('/:mangaId/comments', auth.isAuth, mangaFilter.checkId, commentFilter.checkOwnershipInManga, (req, res) => {
    comments.modifyMangaComment(req.body.commentId, req.body.commentContent).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Comment modified',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not modify comment'
        });
    });
});

//Modify chapter comment
router.put('/:mangaId/chapter/:chapterId/comments', auth.isAuth, mangaFilter.checkId, mangaFilter.checkChapterToGet, commentFilter.checkOwnershipInChapter, (req, res) => {
    comments.modifyChapterComment(req.params.chapterId, req.body.commentContent).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Comment modified',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not modify comment'
        });
    });
});

//Delete manga comment
router.delete('/:mangaId/comments', auth.isAuth, mangaFilter.checkId, commentFilter.checkOwnershipInManga, (req, res) => {
    comments.deleteMangaComment(req.body.commentId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Comment deleted',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not delete comment'
        });
    });
});

//Delete chapter comment
router.delete('/:mangaId/chapter/:chapterId/comments', auth.isAuth, mangaFilter.checkId, mangaFilter.checkChapterToGet, commentFilter.checkOwnershipInChapter, (req, res) => {
    comments.deleteChapterComment(req.body.commentId).then(data => {
        res.status(200).send({
            status: 200,
            message: 'Comment deleted',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: 'Could not delete comment'
        });
    });
});

module.exports = router;