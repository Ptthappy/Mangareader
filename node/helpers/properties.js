module.exports = {
    dbUrl: 'postgres://postgres:mastersword@localhost:5432/Mangareader',
    port: 3000,

    //User queries
    login: 'SELECT * FROM users WHERE user_username = $1  AND user_password = $2 OR user_email = $2;',
    register: 'INSERT INTO users (user_username, user_name, user_password, user_email) VALUES ($1, $2, $3, $4);',
    getUserById: 'SELECT * FROM users WHERE user_id = ?',
    getUserByUsername: 'SELECT * FROM USERS WHERE user_username = ?',

    addManga: 'INSERT INTO manga (user_id, manga_name, manga_synopsis) VALUES ($1, $2, $3);',
    getMangasByGenre: 'SELECT m.manga_name, m.user_id, m.manga_creation_time, FROM manga m ' +
        'INNER JOIN manga_genre mg ON m.manga_id = mg.manga_id WHERE mg.genres_id = 1;',
    getMangasDashboard: 'SELECT * FROM manga ORDER BY manga_creation_time;',
    getManga: 'SELECT *, (SELECT g.genre_des  FROM genres g INNER JOIN manga_genre mg ' +
        'ON g.genres_id = mg.genres_id WHERE g.genres_id = 1 AS genre_id) FROM manga WHERE manga_id = 2',



    addChapter: 'INSERT INTO chapters (manga_id, chapter_number, chapter_title, chapter_location' +
        'chapter_num_pages);',


    addGenre: 'INSERT INTO manga_genre (manga_id, genres_id) VALUES ($1, $2);',


    addChapterComment: 'INSERT INTO comments_chapter (user_id, chapter_id, comment_content) VALUES ($1, $2, $3);',


    addMangaComment: 'INSERT INTO comments_manga (user_id, manga_id, comment_content) VALUES ($1, $2, $3);',


    addChapterLike: 'INSERT INTO likes_chapter (user_id, chapter_id) VALUES ($1, $2);',
    getChapterLike: 'SELECT * FROM likes_chapter WHERE user_id = $1 AND chapter_id = $2;',


    addMangaLike: 'INSERT INTO likes_manga (user_id, manga_id) VALUES ($1, $2);',
    getMangaLike: 'SELECT * FROM likes_manga WHERE user_id = $1 AND manga_id = $2;',


    subscribe: 'INSERT INTO subscribe (user_id, manga_id) VALUES ($1, $2);',


    unsubscribe: 'DELETE FROM subscribe WHERE user_id = $1 AND manga_id = $2;'
};