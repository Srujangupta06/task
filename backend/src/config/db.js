const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const initializeDB = async () => {
    try {
        const connection = await pool.promise().getConnection();
        console.log('DB CONNECTION SUCCESS');
        connection.release();
    } catch (err) {
        console.error('DB CONNECTION FAILED:', err);
        throw err;
    }
};


module.exports = { initializeDB, pool }