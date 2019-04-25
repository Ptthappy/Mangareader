const db = require('../utilities/db');
const bcrypt = require('bcryptjs');
// const reader = require('properties-reader');
const properties = require('../utilities/properties');

module.exports.addManga = (manga) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.addManga, [manga.userId, manga.name, manga.synopsis]).then(manga => {
                const beautifiedManga = {
                    id: manga.manga_id,
                    name: manga.manga_name,
                    synopsis: manga.manga_synopsis,
                    status: manga.manga_status,
                    creationTime: new Date(manga.manga_creation_time).getTime()
                }
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
            }).catch(err => {
                rej(err)
            })
        }).catch(err => {
            rej(err)
        })
    })
}