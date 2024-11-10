import express from 'express'
import { signIn,signUp,signOut,google } from '../controllers/auth_controller.js'

const authRouter=express.Router()

authRouter.post('/sign-in',signIn)
authRouter.post('/sign-up',signUp)
authRouter.post('/google',google)
authRouter.get('/sign-out',signOut)

export default authRouter