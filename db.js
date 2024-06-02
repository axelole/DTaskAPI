import mysql from 'mysql2'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'tugas'
})

export default pool.promise()