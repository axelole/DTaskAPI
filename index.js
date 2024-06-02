import express from 'express'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import airportRoutes from './routes/airportRoutes.js'
import flightRoutes from './routes/flightRoutes.js'
import forumRoutes from './routes/forumRoutes.js'
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.use('/', userRoutes)
app.use('/', airportRoutes)
app.use('/', flightRoutes)
app.use('/', forumRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

