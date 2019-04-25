module.exports = {
    dbUrl: 'postgres://postgres:mastersword@localhost:5432/Mangareader',
    port: 3000,

    login: 'SELECT * FROM users WHERE user_username = $1',

    register: 'INSERT INTO users (type_id, user_username, user_name, user_password, user_creation_time, user_email) ' +
        'VALUES(1, $1, $2, $3, NOW(), $4)',

    modifyUserData: 'UPDATE users SET user_username = $1, user_name = $2 WHERE user_id = $3;',

    modifyUserPassword: 'UPDATE users SET user_password WHERE user_id = $1',

    modifyUserEmail: 'UPDATE users SET user_email WHERE user_id = $1',

    getUserById: 'SELECT * FROM users WHERE user_id = $1',

    getUserByUsername: 'SELECT * FROM USERS WHERE user_username = $1',



    addManga: 'INSERT INTO manga (user_id, manga_name, manga_synopsis) VALUES ($1, $2, $3);',

    getMangasByGenre: 'SELECT m.* FROM manga m INNER JOIN manga_genre mg ON m.manga_id = mg.manga_id ' +
        'WHERE mg.genres_id = $1; ORDER BY m.manga_creation_time',

    getMangasBySearch: 'SELECT * FROM manga WHERE manga_name ILIKE $1;',

    getMangasDashboard: 'SELECT * FROM manga ORDER BY manga_creation_time LIMIT 10;',

    getManga: 'SELECT *, (SELECT g.genre_des  FROM genres g INNER JOIN manga_genre mg ' + //revisar
        'ON g.genres_id = mg.genres_id WHERE g.genres_id = $1 AS genre_id) FROM manga WHERE manga_id = $2',

    modifyManga: 'UPDATE manga SET manga_name = $1, manga_synopsis = $2 WHERE manga_id = $3;',

    deleteManga: 'DELETE FROM manga WHERE manga_id = $1;',

    endManga: 'UPDATE manga SET manga_status = TRUE WHERE manga_id = $1',


    addChapter: 'INSERT INTO chapters (manga_id, chapter_number, chapter_title, chapter_location' +
        'chapter_num_pages) VALUES ($1, $2, $3, $4);',

    getChapters: 'SELECT chapter_number, chapter_title, chapter_location, chapter_num_pages FROM chapters' +
        'WHERE manga_id = $1;',

    modifyChapter: 'UPDATE chapters SET chapter_number = $1, chapter_title = $2, chapter_location = $3, ' +
        'chapter_num_pages = $4 WHERE chapter_id = $5;',

    deleteChapter: 'DELETE FROM chapters WHERE chapter_id = $1',


    addGenre: 'INSERT INTO manga_genre (manga_id, genres_id) VALUES ($1, $2);',

    deleteGenre: 'DELETE FROM manga_genre WHERE manga_id = $1 AND genres_id = $2;',

    getGenres: 'SELECT * FROM genres',


    addChapterComment: 'INSERT INTO comments_chapter (user_id, chapter_id, comment_content) VALUES ($1, $2, $3);',

    deleteChapterComment: 'DELETE FROM comments_chapter WHERE comment_id = $1;',


    addMangaComment: 'INSERT INTO comments_manga (user_id, manga_id, comment_content) VALUES ($1, $2, $3);',

    deleteMangaComment: 'DELETE FROM comments_manga WHERE comment_id = $1',


    addChapterLike: 'INSERT INTO likes_chapter (user_id, chapter_id) VALUES ($1, $2);',

    getChapterLike: 'SELECT * FROM likes_chapter WHERE user_id = $1 AND chapter_id = $2;',

    deleteChapterLike: 'DELETE FROM likes_chapter WHERE like_id = $1',

    getChapterLikesList: 'SELECT * FROM likes_chapter WHERE chapter_id = $1',


    addMangaLike: 'INSERT INTO likes_manga (user_id, manga_id) VALUES ($1, $2);',

    getMangaLike: 'SELECT * FROM likes_manga WHERE user_id = $1 AND manga_id = $2;',

    deleteMangaLike: 'DELETE FROM likes_manga WHERE like_id = $1',

    getMangaLikesList: 'SELECT * FROM likes_manga WHERE manga_id = $1',


    subscribe: 'INSERT INTO subscribe (user_id, manga_id) VALUES ($1, $2);',


    unsubscribe: 'DELETE FROM subscribe WHERE user_id = $1 AND manga_id = $2;'
};