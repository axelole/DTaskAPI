import db from '../db.js'

const registerUser = async (user) => {
    const {username, password} = user
    const [result] = await db.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password]
    )
    return result.insertId
}  

const loginUser = async (user) => {
    const {username, password} = user
    const [users] = await db.execute(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password] 
    )
    return users
}

export {registerUser, loginUser}