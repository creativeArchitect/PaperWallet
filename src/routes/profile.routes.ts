import { Router } from "express";
import { getProfile, updatePassword, updateProfile } from "../controllers/profile.controller.js";

const profileRouter = Router();


profileRouter.get('profile', getProfile);
profileRouter.post('profile/update', updateProfile);
profileRouter.post('profile/update/password', updatePassword);

export default profileRouter;
