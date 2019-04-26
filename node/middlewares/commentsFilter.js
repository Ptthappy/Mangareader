const commentsHelper = require('../helpers/comments')

module.exports.checkOwnershipInManga = (req, res, next) => {
    const commentId = req.body.commentId
    commentsHelper.getMangaSingleComment(commentId).then(result => {
        if(result === null) { res.status(404).send("Comment doesn't exists.") }
        else {
            if(result === req.user.id) {
                next()
            }
            else {
                res.status(403).send("You are not the owner of the comment.")
            }
        }
    })
}

module.exports.checkOwnershipInChapter = (req, res, next) => {
    const commentId = req.body.commentId
    commentsHelper.getChapterSingleComment(commentId).then(result => {
        if(result === null) { res.status(404).send("Comment doesn't exists.") }
        else {
            if(result === req.user.id) {
                next()
            }
            else {
                res.status(403).send("You are not the owner of the comment.")
            }
        }
    })
}