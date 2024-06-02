import { Router } from "express";
import {
    registerUser,
    loginUser
} from '../services/userServices.js'

const userRoutes = Router()

userRoutes.post("/register", async (req, res) => {
    console.log("request body", req.body)
    const formData = {
        username: req.body.username,
        password: req.body.password
    }
    const userId = await registerUser(formData)
    res.json({
        message: "user register success",
        userId
    })
})

userRoutes.post("/login", async (req, res) => {
    const formData = {
        username: req.body.username,
        password: req.body.password
    }
    const user = await loginUser(formData)
    res.json(user)
})

export default userRoutes