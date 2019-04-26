const db = require('../utilities/db');
const properties = require('../utilities/properties');

modules.exports.getChapterComments = chapterId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getChapterComments, [chapterId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                rej(properties.noResults);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

modules.exports.getMangaComments = mangaId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getMangaComments, [mangaId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                rej(properties.noResults);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

modules.exports.commentManga = (userId, mangaId, commentContent) => {
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

modules.exports.commentChapter = (userId, commentId, commentContent) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.addMangaComment, [userId, commentId, commentContent])
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

modules.exports.modifyMangaComment = commentId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyMangaComment, [commentId]).then(() => {
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

modules.exports.modifyChapterComment = commentId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyChapterComment, [commentId]).then(() => {
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

modules.exports.deleteMangaComment = commentId => {
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

modules.exports.deleteChapterComment = commentId => {
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