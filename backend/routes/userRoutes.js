import express from 'express'
import { login , register, userData } from '../controllers/userController.js'
import auth from "../middlewares/auth.js"

const userRoutes = express.Router()

userRoutes.post('/login', login)
userRoutes.post('/register', register)

userRoutes.get('/user-datas/:userId',auth, userData)


export default userRoutes