import db from '../db.js'

const createFlight = async (flight) => {
    const {departure, arrival, date, departuretime, duration, arrivaltime, price} = flight
    const [result] = await db.execute(
        'INSERT INTO flight (departure, arrival, date, departuretime, duration, arrivaltime, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [departure, arrival, date, departuretime, duration, arrivaltime, price]
    )
    const flightid = result.insertId
    const rows = 5
    const seatsperRow = ["a","b","c","d"]
        for (let i = 1; i <= rows; i++) {
            for (let seat of seatsperRow) {
                const seatNumber = `${i}${seat}`;
                await db.execute('INSERT INTO seat (flightid, seatnumber, booked) VALUES (?,?,?)', [flightid, seatNumber, 0])
            }
            
        }
}  

const getFlight = async () => {
    const [rows] = await db.query(
        'SELECT * FROM flight'
    )
    return rows
}  


const getFlightbyId = async (id) => { 
    const [rows] = await db.execute(
        'SELECT * FROM flight WHERE id = ?',
        [id]
    )
    return rows
}  

const updateFlight = async (flight) => {
    const {departure, arrival, date, departuretime, duration, arrivaltime, price, id} = flight;
    const [result] = await db.execute(
        'UPDATE flight SET departure = ?, arrival = ?, date = ?, departuretime = ?, duration = ?, arrivaltime = ?, price = ? WHERE id = ?',
        [departure, arrival, date, departuretime, duration, arrivaltime, price, id]
    );
    return result;
};

const removeFlight = async (id) => {
        const [result] = await db.execute(
        'DELETE FROM flight WHERE id = ?',
        [id]
    );
    return result;
}  

const searchFlight = async (flight) => {
    const {departure, arrival, date} = flight;
    const [result] = await db.execute(
        'SELECT * FROM flight WHERE departure = ? AND arrival = ? AND date = ?',
        [departure, arrival, date]
    );
    return result;
};

const getSeat = async () => {
    const [rows] = await db.query(
        'SELECT * FROM seat'
    )
    return rows
};

const getSeatbyId = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM seat WHERE flightid = ?',
        [id]
    )
    return rows
};

const createOrder = async (order) => {
    const {userid, flightid, seatid, fullName, phone, email} = order
    const [result] = await db.execute(
        'INSERT INTO booking (userid, flightid, seatid, fullName, phone, email) VALUES (?, ?, ?, ?, ?, ?)',
        [userid, flightid, seatid, fullName, phone, email]
    )
    if (result) {
        const [rows] = await db.execute ('UPDATE seat set booked = 1 WHERE id = ?', [seatid])
        return rows
    }
}

const getOrders = async () => {
    const [rows] = await db.query(
        'SELECT * FROM booking'
    )
    return rows
}  

export {createFlight, getFlight, getFlightbyId, updateFlight, removeFlight, searchFlight, getSeat, getSeatbyId, createOrder, getOrders}