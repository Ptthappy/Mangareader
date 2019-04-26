const db = require('../utilities/db');
const properties = require('../utilities/properties');

module.exports.getManga = (id) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone(properties.getManga, [id]).then(result => {
                if(result === null) { rej({ status: 404, message: "Manga with id " + id + " not found." }) }
                else {
                    let genresArray = []
                     obj.any(properties.getMangaGenres, [result.manga_id]).then(genres => {
                        genres.forEach(genre => {
                            genresArray.push(genre.genres_id)
                        })
                        const beautifiedManga = {
                            id: result.manga_id,
                            name: result.manga_name,
                            synopsis: result.manga_synopsis,
                            status: result.manga_status,
                            creationTime: new Date(result.manga_creation_time).getTime(),
                            genres: genresArray,
                            user: {
                                id: result.user_id,
                                name: result.user_name,
                                username: result.user_username
                            }
                        }
                        res({ status: 200, manga: beautifiedManga })
                     })
                }
            }).catch(err => {
                rej({ status: 500, message: "Query Error." })
            })
        }).catch(err => {
            rej({ status: 500, message: "Database Error." })
        })
    })
}

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
                rej("Query Error.")
            })
        }).catch(err => {
            rej("Database Error.")
        })
    })
}

module.exports.search = (by, query) => {
    if(by === 'name' || by === 'author') { query = "%" + query + "%"}
    const arrayBeautified = []
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.any(properties["searchBy" + by.charAt(0).toUpperCase() + by.slice(1, by.length)], [query]).then(results => {
                let mangaBeautified = {}
                let genresArray = []
                results.forEach((result, i) => {
                    genresArray = []
                    obj.any(properties.getMangaGenres, [result.manga_id]).then(genres => {
                        genres.forEach(genre => {
                            genresArray.push(genre.genres_id)
                        })
                        mangaBeautified = {
                            id: result.manga_id,
                            name: result.manga_name,
                            synopsis: result.manga_synopsis,
                            status: result.manga_status,
                            creationTime: new Date(result.manga_creation_time).getTime(),
                            genres: genresArray,
                            user: {
                                id: result.user_id,
                                username: result.user_username, 
                                name: result.user_name
                            }
                        }
                        arrayBeautified.push(mangaBeautified)
                        if(i === results.length - 1) {
                            res(arrayBeautified)
                        }
                    })
                })
                if(results.length === 0) {
                    res([])
                }
            }).catch(err => {
                rej("Query Error.")
            })
        })
        .catch(err => {
            rej("Database Error.")
        })
    })
}

module.exports.getMangaStatus = (mangaId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.getMangaStatus, [mangaId]).then(result => {
                res(result.manga_status)
            })
        })
    })
}