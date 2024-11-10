import express from "express"
import {store} from "../controllers/userController.js"

const userRouter =express.Router()

userRouter.get('/sign-up',store)
//userRouter.get('/test',test)
//userRouter.post('/show',show)

export default userRouter;
