import { Router } from "express";
import {
    getAirport
} from '../services/airportServices.js'

const airportRoutes = Router()

airportRoutes.get("/airport", async (req, res) => {
    let data = await getAirport()
    res.json(data)
})

export default airportRoutes