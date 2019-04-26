const db = require('../utilities/db');
const properties = require('../utilities/properties');

const getRecentDashboard = () => {
    const arrayBeautified = []
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.any(properties.getRecentDashboard).then(results => {
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
                            res({ recent: arrayBeautified, subscribed: [] })
                        }
                    })
                });
                if(results.length === 0) {
                    res([])
                }
            }).catch(err => rej("Query Error"))
        }).catch(err => rej("Database Error"))
    })
}

module.exports.getLoggedDashboard = (userId) => {
    return new Promise((res, rej) => {
        let dashboard = {}
        getRecentDashboard().then(recents => {
            dashboard = recents
        }, err => rej(err))
        let genresArray = []
        db.connect().then(obj => {
            obj.any(properties.getSubscribedDashboard, [userId]).then(subscribes => {
                const arrayBeautified = []
                let mangaBeautified = {}
                subscribes.forEach((result, i) => {
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
                        if(i === subscribes.length - 1) {
                            dashboard.subscribed = arrayBeautified
                            res(dashboard)
                        }
                    })
                    if(subscribes.length === 0) {
                        dashboard.subscribed = []
                        res(dashboard)
                    }
                })
               
            }).catch(err => rej("Query Error."))
        }).catch(err => rej("Database Error."))
    })
}

module.exports.getRecentDashboard = getRecentDashboard