const db = require('../utilities/db');
const bcrypt = require('bcryptjs');
// const reader = require('properties-reader');
const properties = require('../utilities/properties');

module.exports.addManga = (manga) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.addManga, [manga.userId, manga.name, manga.synopsis]).then(result => {
                const beautifiedManga = {
                    id: result.manga_id,
                    name: result.manga_name,
                    synopsis: result.manga_synopsis,
                    status: result.manga_status,
                    creationTime: new Date(result.manga_creation_time).getTime(),
                    genres: manga.genres
                }
                manga.genres.forEach(genre => {
                    obj.none(properties.addGenre, [beautifiedManga.id, genre]).catch(err => rej(err))
                })
                res(beautifiedManga)
                obj.done()
            }).catch(err => {
                rej(err)
            })
        }).catch(err => {
            rej(err)
        })
    })
}

module.exports.deleteManga = (mangaId, userId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.result(properties.deleteManga, [mangaId, userId], r => r.rowCount).then(count => {
                res(count)
                obj.done()
            }).catch(err => {
                rej(err)
            })
        }).catch(err => {
            rej(err)
        })
    })
}

module.exports.modifyManga = (manga, userId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.result(properties.modifyManga, [manga.name, manga.synopsis, manga.id, userId], r => r.rowCount).then(count => {
                res(count)
                obj.done()
            }).catch(err => {
                rej(err)
            })
        }).catch(err => {
            rej(err)
        })
    })
}

module.exports.search = (by, query) => {
    if(by === 'name' || by === 'author') { query = "%" + query + "%"}
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.any(properties["searchBy" + by.charAt(0).toUpperCase() + by.slice(1, by.length)], [query]).then(results => {
                const arrayBeautified = []
                let mangaBeautified = {}
                results.forEach(result => {
                    mangaBeautified = {
                        id: result.manga_id,
                        name: result.manga_name,
                        synopsis: result.manga_synopsis,
                        status: result.manga_status,
                        creationTime: new Date(result.manga_creation_time).getTime(),
                        user: {
                            id: result.user_id,
                            username: result.user_username, 
                            name: result.user_name
                        }
                    }
                    arrayBeautified.push(mangaBeautified)
                })
                res(arrayBeautified)
                obj.done()
            }).catch(err => {
                console.log(err)
                rej(err)
            })
        }).catch(err => {
            rej(err)
        })
    })
}