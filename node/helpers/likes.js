const db = require('../utilities/db');
const properties = require('../utilities/properties');

module.exports.getMangaLikes = mangaId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getMangaLikes, [mangaId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                res(properties.noResults);
            });
        }).catch(err => {
            rej(properties.dbConError);
            console.log(err);
        });
    });
};

module.exports.getChapterLikes = chapterId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getChapterLikes, [chapterId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                res(properties.noResults);
            });
        }).catch(err => {
            rej(properties.dbConError);
            console.log(err);
        });
    });
};

module.exports.getLike = (userId, id, manga) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone( manga ? properties.getOwnMangaLike: properties.getOwnChapterLike,
                [userId, id]).then(data => {
                if (data === null)
                    res(false);
                else
                    res(true);

                obj.done();
            }).catch(err => {
                res(properties.dbError);
                console.log(err);
            });
        }).catch(err => {
            rej(properties.dbConError);
            console.log(err);
        });
    });
};

module.exports.likeManga = (userId, mangaId) => {
    return new Promise((res, rej) => {
        this.getLike(userId, mangaId, true).then(data => {
            if (!data) {
                db.connect().then(obj => {
                    obj.none(properties.addMangaLike, [userId, mangaId]).then(() => {
                        res();
                        obj.done();
                    }).catch(err => {
                        rej(properties.dbError);
                        console.log(err);
                    });
                }).catch(err => {
                    rej(properties.dbConError);
                    console.log(err);
                });
            } else rej();
        }).catch(err => {
            console.log(err);
            rej(properties.mangaLiked);
        });
    });
};

module.exports.likeChapter = (userId, chapterId) => {
    return new Promise((res, rej) => {
        this.getLike(userId, chapterId, false).then(data => {
            db.connect().then(obj => {
                if (!data) {
                    obj.none(properties.addChapterLike, [userId, chapterId]).then(() => {
                        res();
                        obj.done();
                    }).catch(err => {
                        rej(properties.dbError);
                        console.log(err);
                    });
                } else rej();
            }).catch(err => {
                rej(properties.dbConError);
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
            rej(properties.chapterLiked);
        })
    });
};

module.exports.deleteLike = (likeId, manga) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(manga ? properties.deleteMangaLike: properties.deleteChapterLike, [likeId])
                .then(() => {
                    res();
                    obj.done();
            }).catch(err => {
                rej(properties.dbError);
                console.log(err);
            });
        }).catch(err => {
            rej(properties.dbConError);
            console.log(err);
        });
    });
};