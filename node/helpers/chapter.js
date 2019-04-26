const db = require('../utilities/db');
const properties = require('../utilities/properties');

module.exports.addChapter = (mangaId, chapter) => {
    return new Promise((res, rej) => {
        const location = '/assets/manga' + mangaId + "/chapter" + chapter.number + "/"
        db.connect().then(obj => {
            console.log(chapter)
            obj.one(properties.addChapter, [mangaId, chapter.number, chapter.title, location, chapter.numberPages]).then(result => {
                const beautifiedChapter = {
                    id: result.chapter_id,
                    mangaId: result.manga_id,
                    number: result.chapter_number,
                    title: result.chapter_title,
                    location: result.chapter_location,
                    pages: result.chapter_num_pages
                }
                res(beautifiedChapter)
                obj.done()
            }).catch(err => { rej("Query Error." ); console.log(err) })
        }).catch(err => { rej("Database Error."); console.log(err) })
    })
}

module.exports.checkChapter = (mangaId, chapterNumber) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.result(properties.checkChapter, [mangaId, chapterNumber], r => r.rowCount).then(count => {
                res(count === 1)
                obj.done()
            })
        }).catch(err => { res(true) })
    })
}

module.exports.getChapter = (mangaId, chapterId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.getChapterById, [mangaId, chapterId]).then(result => {
                const beautifiedChapter = {
                    id: result.chapter_id,
                    mangaId: result.manga_id,
                    number: result.chapter_number,
                    title: result.chapter_title,
                    location: result.chapter_location,
                    pages: result.chapter_num_pages
                }
                res(beautifiedChapter)
                obj.done()
            }).catch(err => rej("Query Error."))
        }).catch(err => rej("Database Error."))
    })
}

module.exports.getChaptersOfManga = (mangaId) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.any(properties.getChapters, [mangaId]).then(results => {
                const arrayOfChapters = []
                let beautifiedChapter = {}
                results.forEach(result => {
                    beautifiedChapter = {
                        id: result.chapter_id,
                        mangaId: result.manga_id,
                        number: result.chapter_number,
                        title: result.chapter_title,
                        location: result.chapter_location,
                        pages: result.chapter_num_pages
                    }
                    arrayOfChapters.push(beautifiedChapter)
                })
                res({ chapters: arrayOfChapters })
                obj.done()
            }).catch(err => rej("Query Error."))
        }).catch(err => rej("Database Error."))
    })
}

module.exports.deleteChapter = (mangaId, number) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.deleteChapter, [mangaId, number]).then(() => {
                res("Deleted chapter " + number + " from manga " + mangaId + " successfully.")
            }).catch(err => rej("Query Error."))
        }).catch(err => rej("Database Error."))
    })
}