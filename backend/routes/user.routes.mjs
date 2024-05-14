import express from 'express'
import { loginHandler,logoutHandler,registerHandler,loadAuthUser } from '../controllers/user.controllers.mjs'
import {isAuthenticatedUser} from '../middlewares/auth.middleware.mjs'

const router=express.Router()

router.post("/register",registerHandler)
router.post("/login",loginHandler)
router.get("/logout",logoutHandler)
router.get("/me",isAuthenticatedUser,loadAuthUser)



export  {router as userRoutes}