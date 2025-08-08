import User from "../models/User.js";
import { getPasswordHash, validateUser } from "../services/user.service.js";
import AppError from "../utils/error.utils.js";

export const getProfile = async (req: any, res: any, next: any) => {
    try{
        const { id } = req.user;

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "user doesn't exists",
            })
        }
        
        res.status(200).json({
            success: true,
            message: "got user profile successfully.",
            user
        })

    }catch(err){
        console.error("Error in getting profile:", err);
        return next(new AppError("ERROR: " + err, 500));
    }
}

export const updateProfile = async (req: any, res: any, next: any)=> {
    try{
        const updationAllowed = ["firstName", "lastName"];

        const { id } = req.user;

        const user = await User.findById(id);
        if(!user){
            return next(new AppError("Invalid user", 404));
        }
        
        const isUpdationAllowed = Object.keys(req.body).every(key => updationAllowed.includes(key));

        if(!isUpdationAllowed){
            return next(new AppError("updation not allowed", 400));
        }

        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;

        await user.save();

        res.status(200).json({
            success: true,
            message: "profile updated successfully.",
            user
        })

    }catch(err){
        console.error("Error in updation in profile:", err);
        return next(new AppError("ERROR: " + err, 500));
    }
}

export const updatePassword = async (req: any, res: any, next: any)=> {
    try{
        const { oldPassword, newPassword } = req.body;
        const { id } = req.user;

        if(!oldPassword || !newPassword){
            return next(new AppError("Enter the required fields", 400));
        }

        const user = await User.findById(id).select("+password");
        if(!user){
            return next(new AppError("user doesn't exists", 400))
        }

        const isValidPassword = await validateUser(user.email, oldPassword)
        if(!isValidPassword){
            return next(new AppError("Invalid old password", 400));
        }
        const hashedNewPassword = await getPasswordHash(newPassword)
        user.password = hashedNewPassword;

        await user.save();

        user.password = "";

        res.status(200).json({
            success: true,
            message: "password changed successfully.",
        });

    }catch(err){
        console.error("Error in updatePassword:", err);
        return next(new AppError("ERROR: " + err, 500));
    }
}


