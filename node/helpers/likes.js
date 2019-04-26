const db = require('../utilities/db');
const properties = require('../utilities/properties');

modules.exports.getMangaLikes = mangaId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getMangaLikes, [mangaId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                rej(properties.noResults);
            });
        }).catch(err => {
            rej(properties.dbConError);
            console.log(err);
        });
    });
};

modules.exports.getChapterLikes = chapterId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getChapterLikes, [chapterId]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                rej(properties.noResults);
            });
        }).catch(err => {
            rej(properties.dbConError);
            console.log(err);
        });
    });
};

modules.exports.getMangaLike = (userId, manga) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone( manga ? properties.getOwnMangaLike: properties.getOwnChapterLike,
                [userId]).then(data => {
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

modules.exports.likeManga = (userId, mangaId) => {
    return new Promise((res, rej) => {
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
    });
};

modules.exports.likeChapter = (userId, chapterId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.addChapterLike, [userId, chapterId]).then(() => {
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

modules.exports.deleteLikeManga = mangaId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.deleteMangaLike, [mangaId]).then(() => {
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

modules.exports.deleteLikeChapter = chapterId => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.deleteChapterLike, [chapterId]).then(() => {
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