module.exports = {
    dbUrl: 'postgres://postgres:mastersword@localhost:5432/Mangareader',
    port: 3000,

    login: 'SELECT * FROM users WHERE user_username = $1',
    register: 'INSERT INTO users(type_id, user_username, user_name, user_password, user_creation_time, user_email) VALUES(1, $1, $2, $3, NOW(), $4)'
};