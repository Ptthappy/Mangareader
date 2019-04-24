module.exports = {
    dbUrl: 'postgres://postgres:mastersword@localhost:5432/Mangareader',
    port: 3000,

    login: 'SELECT * FROM users WHERE user_username = $1  AND user_password = $2'
};