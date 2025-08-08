import { Router } from "express";
import { login, register, logout, getProfile } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('register', register);
userRouter.post('login', login);
userRouter.get('profile', getProfile);
userRouter.get('logout', logout);


export default userRouter;