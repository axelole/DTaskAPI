import db from '../db.js'

const getAirport = async () => {
    const [result] = await db.execute('SELECT * FROM airport')
    return result
}  

export {getAirport}