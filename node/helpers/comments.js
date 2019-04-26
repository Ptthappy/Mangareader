const db = require('../utilities/db');
const properties = require('../utilities/properties');

module.exports.getChapterComments = chapterId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getChapterComments, [chapterId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                res(properties.noResults);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.getMangaComments = mangaId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getMangaComments, [mangaId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                console.log(err);
                res(properties.noResults);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.commentManga = (userId, mangaId, commentContent) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.addMangaComment, [userId, mangaId, commentContent])
                .then(() => {
                res();
                obj.done();
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            });
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.commentChapter = (userId, chapterId, commentContent) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.addChapterComment, [userId, chapterId, commentContent])
                .then(() => {
                    console.log('commented');
                    res();
                    obj.done();
                }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            });
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.modifyMangaComment = (commentId, commentContent) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyMangaComment, [commentContent, commentId]).then(() => {
                    res();
                    obj.done();
                }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            });
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.modifyChapterComment = (commentId, commentContent) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyChapterComment, [commentContent, commentId]).then(() => {
                res();
                obj.done();
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            });
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.deleteMangaComment = commentId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.deleteMangaComment, [commentId]).then(() => {
                res();
                obj.done();
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            });
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.deleteChapterComment = commentId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.deleteChapterComment, [commentId]).then(() => {
                res();
                obj.done();
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            });
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.getMangaSingleComment = (commentId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone(properties.getMangaSingleComment, [commentId]).then(result => {
                if(result === null) { res(null) }
                else { res(result.user_id) }
            }).catch(err => rej("Query Error."))
        }).catch(err => rej("Database Error."))
    })
}

module.exports.getChapterSingleComment = (commentId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone(properties.getChapterSingleComment, [commentId]).then(result => {
                if(result === null) { res(null) }
                else { res(result.user_id) }
            }).catch(err => rej("Query Error."))
        }).catch(err => rej("Database Error."))
    })
}