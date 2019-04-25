const db = require('../utilities/db');
const properties = require('../utilities/properties');

const getRecentDashboard = () => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.any(properties.getRecentDashboard).then(results => {
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
                });
                res({ recents: arrayBeautified, subscribed: [] })
                obj.done()
            }).catch(err => rej("Query Error"))
        }).catch(err => rej("Database Error"))
    })
}

module.exports.getLoggedDashboard = (userId) => {
    return new Promise((res, rej) => {
        let dashboard = {}
        getNotLoggedDashboard().then(recents => {
            dashboard = recents
        }, err => rej(err))
        db.connect().then(obj => {
            obj.any(properties.getSubscribedDashboard, [userId]).then(subscribes => {
                const arrayBeautified = []
                let mangaBeautified = {}
                subscribes.forEach(result => {
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
                dashboard.subscribed = arrayBeautified
                res(dashboard)
                obj.done()
            }).catch(err => rej("Query Error."))
        }).catch(err => rej("Database Error."))
    })
}

module.exports.getRecentDashboard = getRecentDashboard