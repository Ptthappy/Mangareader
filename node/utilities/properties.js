module.exports = {
    dbUrl: 'postgres://postgres:mastersword@localhost:5432/Mangareader',
    port: 3000,

    login: 'SELECT * FROM users WHERE user_username = $1 OR user_email = $1',

    register: 'INSERT INTO users(type_id, user_username, user_name, user_password, user_creation_time, user_email) ' +
        'VALUES(1, $1, $2, $3, NOW(), $4) RETURNING *',
    
    checkUsernameAndEmail: 'SELECT * FROM users WHERE user_username = $1 OR user_email = $2',

    modifyUserData: 'UPDATE users SET user_username = $1, user_name = $2 WHERE user_id = $3;',

    modifyUserPassword: 'UPDATE users SET user_password = $1 WHERE user_id = $2',

    modifyUserEmail: 'UPDATE users SET user_email = $1 WHERE user_id = $2',

    getPassword: 'SELECT user_password FROM users WHERE user_id = $1',

    getUserById: 'SELECT user_id, user_username, user_name, user_email FROM users WHERE user_id = $1',

    getUserByUsername: 'SELECT user_id, user_username, user_name, user_email FROM users WHERE user_username = $1',

    getUsers: 'SELECT user_id, user_username, user_name, user_email FROM users',


    addManga: 'INSERT INTO manga (user_id, manga_name, manga_synopsis) VALUES ($1, $2, $3) RETURNING *;',

    searchByGenre: 'SELECT m.*, u.user_id, u.user_username, u.user_name FROM manga m INNER JOIN users u ON u.user_id = m.user_id WHERE m.manga_id IN ' + 
    '(SELECT mg.manga_id FROM manga_genre mg WHERE mg.genres_id = $1) ORDER BY m.manga_creation_time',

    searchByName: 'SELECT m.*, u.user_id, u.user_username, u.user_name FROM manga m INNER JOIN users u ON u.user_id = m.user_id WHERE m.manga_name ILIKE $1;',

    searchByAuthor: 'SELECT m.*, u.user_id, u.user_username, u.user_name FROM manga m INNER JOIN users u ON u.user_id = m.user_id WHERE u.user_name ILIKE $1 OR u.user_username ILIKE $1;',

    getRecentDashboard: 'SELECT m.*, u.user_id, u.user_username, u.user_name FROM manga m INNER JOIN users u ON u.user_id = m.user_id ORDER BY manga_creation_time DESC LIMIT 10;',

    getSubscribedDashboard: 'SELECT m.*, u.user_id, u.user_username, u.user_name FROM manga m INNER JOIN subscribe s ON s.manga_id = m.manga_id INNER JOIN users u ON u.user_id = s.user_id ' + 
    ' WHERE s.user_id = $1 ORDER BY m.manga_creation_time DESC;',

    getManga: 'SELECT m.*, u.user_id, u.user_name, u.user_username FROM manga m INNER JOIN users u ON m.user_id = u.user_id WHERE m.manga_id = $1',

    modifyManga: 'UPDATE manga SET manga_name = $1, manga_synopsis = $2 WHERE manga_id = $3 AND user_id = $4 RETURNING *;',

    deleteManga: 'DELETE FROM subscribe WHERE manga_id = $1; DELETE FROM manga_genre WHERE manga_id = $1; DELETE FROM manga WHERE manga_id = $1 AND user_id = $2;',

    endManga: 'UPDATE manga SET manga_status = TRUE WHERE manga_id = $1',
    
    getMangaStatus: 'SELECT manga_status FROM manga WHERE manga_id = $1',

    getMangaGenres: 'SELECT genres_id FROM manga_genre WHERE manga_id = $1',


    addChapter: 'INSERT INTO chapters (manga_id, chapter_number, chapter_title, chapter_location, ' +
        'chapter_num_pages, chapter_creation_time) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *;',

    getChapters: 'SELECT * from chapters WHERE manga_id = $1;',

    getChapterById: 'SELECT * from chapters WHERE manga_id = $1 AND chapter_number = $2',

    deleteChapter: 'DELETE FROM chapters WHERE manga_id = $1 AND chapter_number = $2',

    checkChapter: 'SELECT * FROM chapters WHERE manga_id = $1 AND chapter_number = $2',

    addGenre: 'INSERT INTO manga_genre (manga_id, genres_id) VALUES ($1, $2);',

    deleteGenre: 'DELETE FROM manga_genre WHERE manga_id = $1 AND genres_id = $2;',


    addChapterComment: 'INSERT INTO comments_chapter (user_id, chapter_id, comment_content) VALUES ($1, $2, $3);',

    getChapterComments: 'SELECT u.user_username, c.comment_id, c.comment_content, c.comment_creation_time ' +
        'FROM comments_chapter c INNER JOIN users u ON u.user_id = c.user_id WHERE chapter_id = $1;',

    modifyChapterComment: 'UPDATE comments_chapter SET comment_content = $1 WHERE comment_id = $2;',

    deleteChapterComment: 'DELETE FROM comments_chapter WHERE comment_id = $1;',


    addMangaComment: 'INSERT INTO comments_manga (user_id, manga_id, comment_content) VALUES ($1, $2, $3);',

    getMangaComments: 'SELECT u.user_username, c.comment_id, c.comment_content, c.comment_creation_time ' +
        'FROM comments_manga c INNER JOIN users u ON u.user_id = c.user_id WHERE manga_id = $1;',

    modifyMangaComment: 'UPDATE comments_manga SET comment_content = $1 WHERE comment_id = $2;',

    deleteMangaComment: 'DELETE FROM comments_manga WHERE comment_id = $1',


    addChapterLike: 'INSERT INTO likes_chapter (user_id, chapter_id) VALUES ($1, $2);',

    getChapterLike: 'SELECT * FROM likes_chapter WHERE user_id = $1 AND chapter_id = $2;',

    deleteChapterLike: 'DELETE FROM likes_chapter WHERE like_id = $1',

    getChapterLikes: 'SELECT * FROM likes_chapter WHERE chapter_id = $1',

    getOwnChapterLike: 'SELECT like_id FROM likes_chapter WHERE user_id = $1 AND chapter_id = $2;',


    addMangaLike: 'INSERT INTO likes_manga (user_id, manga_id) VALUES ($1, $2);',

    getMangaLike: 'SELECT * FROM likes_manga WHERE user_id = $1 AND manga_id = $2;',

    deleteMangaLike: 'DELETE FROM likes_manga WHERE like_id = $1',

    getMangaLikes: 'SELECT * FROM likes_manga WHERE manga_id = $1',

    getOwnMangaLike: 'SELECT like_id FROM likes_manga WHERE user_id = $1 AND manga_id = $2;',


    subscribe: 'INSERT INTO subscribe (manga_id, user_id) VALUES ($1, $2);',

    unsubscribe: 'DELETE FROM subscribe WHERE manga_id = $1 AND user_id = $2;',

    checkSubscribe: 'SELECT * FROM subscribe WHERE manga_id = $1 AND user_id = $2',

    //Messages
    noResults: 'No results were found',
    dbConError: 'Database Connection Error',
    dbError: 'Database Error',
    mangaLiked: 'Manga Already Liked',
    chapterLiked: 'Chapter Already Liked'
};